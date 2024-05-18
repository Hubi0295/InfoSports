from django.http import HttpResponse
from django.shortcuts import render
from urllib.request import urlopen
import json
import threading
from datetime import datetime, timedelta
from django.template import loader

import time
def index(request):
    return render(request,"index.html")
def f1(request):
    return render(request,"f1.html")
def football(request):
    return render(request,"football.html")
def tenis(request):
    return render(request,"tenis.html")
def f1_DaneKierowcy(request):
    context={}
    nazwiska = json.loads(urlopen('https://api.openf1.org/v1/drivers?session_key=latest').read().decode('utf-8'))
    tab_naziwsk=[]
    for x in nazwiska:
        tab_naziwsk.append(x["last_name"])
    context["drivers_lastname"] = tab_naziwsk
    parametr = request.GET.get('driverLastName')

    if parametr:
        response = urlopen('https://api.openf1.org/v1/drivers?last_name=' + str(parametr) + '&meeting_key=latest&session_key=latest')
        data = json.loads(response.read().decode('utf-8'))[0]

        meeting_info = json.loads(urlopen("https://api.openf1.org/v1/meetings?meeting_key="+str(data["meeting_key"])).read().decode('utf-8'))[0]["meeting_name"]
        session_info = json.loads(urlopen("https://api.openf1.org/v1/sessions?session_key="+str(data["session_key"])).read().decode('utf-8'))[0]["session_name"]
        try:
            radio = json.loads(urlopen("https://api.openf1.org/v1/team_radio?meeting_key=latest&driver_number=" + str(data["driver_number"])).read().decode('utf-8'))[0]["recording_url"]
        except:
            radio = "#"
        context["broadcast_name"] = data["broadcast_name"]
        context["country_code"] = data["country_code"]
        context["driver_number"] = data["driver_number"]
        context["first_name"] = data["first_name"]
        context["full_name"] = data["full_name"]
        context["headshot_url"] = data["headshot_url"]
        context["last_name"] = data["last_name"]
        context["meeting_key"] = meeting_info
        context["name_acronym"] = data["name_acronym"]
        context["session_key"] = session_info
        context["team_colour"] = data["team_colour"]
        context["team_name"] = data["team_name"]
        context["radio"] = radio
        return render(request, "f1_DaneKierowcy.html", context)
    else:
        return render(request, "f1_DaneKierowcy.html", context)
def f1_HistoriaF1(request):
    return render(request, "f1Historia.html")
def f1_MojeWyscigiF1(request):
    return render(request, "f1_MojeWyscigi.html")
def f1_StatystykiF1(request):
    context={}
    context["dateStart"] = request.GET.get('dateStart')
    if context["dateStart"]:
        context["dateEnd"] = request.GET.get('dateEnd')
        context["type"] = request.GET.get('type')
        context["rainfall"]=request.GET.get('rainfall')
        context["air_temperature"] = request.GET.get('air_temperature')
        context["track_temperature"] = request.GET.get('track_temperature')
        context["wind_direction"] = request.GET.get('wind_direction')
        context["wind_speed"] = request.GET.get('wind_speed')
        context["pressure"] = request.GET.get('pressure')
        context["humidity"] = request.GET.get('humidity')
        context["isAccepted"] = request.GET.get('isAccepted')

        response = urlopen('https://api.openf1.org/v1/weather?'
                           'date>='                 + str(context["dateStart"]) +
                           '&date<='                + str(context["dateEnd"])+
                           '&rainfall='             +str(context["rainfall"])+
                           '&air_temperature>='     +str(int(context["air_temperature"])-1)+
                           '&air_temperature<='     +str(int(context["air_temperature"])+1)+
                           '&track_temperature>='   + str(int(context["track_temperature"]) - 1) +
                           '&track_temperature<='   + str(int(context["track_temperature"]) + 1) +
                           '&wind_direction>='      + str(int(context["wind_direction"]) - 1) +
                           '&wind_direction<='      + str(int(context["wind_direction"]) + 1) +
                           '&wind_speed>='          + str(int(context["wind_speed"]) - 1) +
                           '&wind_speed<='          + str(int(context["wind_speed"]) + 1) +
                           '&pressure>='            + str(int(context["pressure"]) - 1) +
                           '&pressure<='            + str(int(context["pressure"]) + 1) +
                           '&humidity>='            + str(int(context["humidity"]) - 1) +
                           '&humidity<='            + str(int(context["humidity"]) + 1)
                           )
        data = json.loads(response.read().decode('utf-8'))
        if(data):
            searchedMeeting = json.loads(urlopen('https://api.openf1.org/v1/meetings?meeting_key='+str(data[0]['meeting_key'])).read().decode('utf-8'))[0]
            context["meeting_name"]=searchedMeeting["meeting_name"]
            context["meeting_official_name"] = searchedMeeting["meeting_official_name"]
            context["location"] = searchedMeeting["location"]
            context["country_name"] = searchedMeeting["country_name"]
            context["circuit_short_name"] = searchedMeeting["circuit_short_name"]
            context["date_start"] = searchedMeeting["date_start"]
            context["meeting_key"] = searchedMeeting["meeting_key"]

        else:
            context["data"]="Brak danych"

        return render(request, "f1_StatystykiF1.html", context)
    else:
        return render(request, "f1_StatystykiF1.html", context)
def f1_Live(request):
    thread = threading.Thread(target=update)
    thread.daemon = True
    thread.start()
    return render(request, "f1_live.html")
def update():
    date_start = datetime.fromisoformat("2024-05-04T16:20:59.569000+00:00").isoformat()
    while True:
        date_end = (datetime.fromisoformat(date_start)+timedelta(seconds=5)).isoformat()
        response = json.loads(urlopen("https://api.openf1.org/v1/intervals?session_key=9506&date>="+str(date_start)+"&date<="+str(date_end)).read().decode('utf-8'))
        print(response)
        plik = open("InfoSportsApp/static/zrodloDanych.txt",'w')
        wyniki=[]
        for x in response:
            x= dict(x)
            dane=[]
            dane.append(int(x.get("driver_number")))
            try:
                dane.append(float(x.get("gap_to_leader")))
            except:
                dane.append(None)
            try:
                dane.append(float(x.get("interval")))
            except:
                dane.append(None)
            wyniki.append(dane)
        pierwszy = wyniki[0][0]
        for i in range(0,len(wyniki)-1):
            if wyniki[i][0] == pierwszy and i!=0:
                del wyniki[i:len(wyniki)]
                break
            for j in range(i,len(wyniki)-1):
                try:
                    if wyniki[i][1] > wyniki[j][1]:
                        wyniki[i][1], wyniki[j][1] = wyniki[j][1], wyniki[i][1]
                except(Exception):
                    print(Exception)
        for x in wyniki:
            plik.write("Numer Kierowcyy: "+str(x[0])+" Strata do lidera: "+str(x[1])+" Strata do najblizszego kierowcy: "+str(x[2])+"\n")
        plik.write(str(datetime.now()))
        plik.close()
        time.sleep(5)
        date_start=date_end
        print(date_start)
        print(date_end)

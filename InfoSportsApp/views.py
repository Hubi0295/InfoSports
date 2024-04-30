from django.http import HttpResponse
from django.shortcuts import render
from urllib.request import urlopen
import json

from django.template import loader


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
        return render(request, "f1_DaneKierowcy.html", context)
    else:
        return render(request, "f1_DaneKierowcy.html", context)
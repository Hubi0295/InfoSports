from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.index, name="index"),
    path("f1/",views.f1, name="f1"),
    path("f1/DaneKierowcy/",views.f1_DaneKierowcy, name="f1_DaneKierowcy"),
    path("f1/HistoriaF1/", views.f1_HistoriaF1, name="f1_HistoriaF1"),
    path("f1/StatystykiWyscigow/",views.f1_StatystykiF1, name="f1_StatystykiF1"),
    path("f1/MojeWyscigi/", views.f1_MojeWyscigiF1, name="f1_MojeWyscigiF1"),
    path("f1/Live/", views.f1_Live, name="f1_LiveF1"),
    path("football/", views.football, name="football"),
    path("tenis/", views.tenis, name="tenis"),
]
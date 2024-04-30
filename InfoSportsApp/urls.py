from django.urls import path

from . import views

urlpatterns = [
    path("home/", views.index, name="index"),
    path("f1/",views.f1, name="f1"),
    path("f1/DaneKierowcy/",views.f1_DaneKierowcy, name="f1_DaneKierowcy"),
    path("football/", views.football, name="football"),
    path("tenis/", views.tenis, name="tenis"),
]
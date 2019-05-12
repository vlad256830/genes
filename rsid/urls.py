from django.urls import path

from rsid.views import GenesListCreateView, RSIDListCreateView, GroupsListCreateView, \
    RiskListCreateView, GenesRUD, RSIDRUD, GroupsRUD, RiskRUD

urlpatterns = [
    path('genes/', GenesListCreateView.as_view()),
    path('genes/edit/<int:pk>/', GenesRUD.as_view()),
    path('rsid/', RSIDListCreateView.as_view()),
    path('rsid/edit/<int:pk>/', RSIDRUD.as_view()),
    path('groups/', GroupsListCreateView.as_view()),
    path('groups/edit/<int:pk>/', GroupsRUD.as_view()),
    path('risk/', RiskListCreateView.as_view()),
    path('risk/edit/<int:pk>/', RiskRUD.as_view()),
]
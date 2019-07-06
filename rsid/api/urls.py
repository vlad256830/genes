from django.urls import path

from rsid.api.views import GenesListCreateView, RSIDListCreateView, GroupsListCreateView, \
    RiskListCreateView, GenesRUD, RSIDRUD, GroupsRUD, RiskRUD, RSIDGeneListView,\
    GenesRSIDSListView, GroupsRiskListView, FileUploadView, AppendNewGroup, GeneDataView,\
    ClientDataView, AnalizDataView

urlpatterns = [
    path('genes/', GenesListCreateView.as_view()),
    path('genesrsids/', GenesRSIDSListView.as_view()),
    path('genes/edit/<int:pk>/', GenesRUD.as_view()),
    path('rsid/', RSIDListCreateView.as_view()),
    path('rsidgene/', RSIDGeneListView.as_view()),
    path('rsid/edit/<int:pk>/', RSIDRUD.as_view()),
    path('groups/', GroupsListCreateView.as_view()),
    path('groupsrisk/', GroupsRiskListView.as_view()),
    path('groups/edit/<int:pk>/', GroupsRUD.as_view()),
    path('risk/', RiskListCreateView.as_view()),
    path('risk/edit/<int:pk>/', RiskRUD.as_view()),
    path('newcsvgroup/', FileUploadView.as_view()),
    path('appendnewgroup/', AppendNewGroup.as_view()), 
    path('genedata/', GeneDataView.as_view()),
    # path('addgenedatatotable/', ClientDataView.as_view()),
    path('analiz/', AnalizDataView.as_view()),

]
from django.conf.urls import url


from .views import GeneAPIView

urlpatterns = [
    url(r'^$', GeneAPIView.as_view(), name='genes'),
    #url(r'^(?P<pk>\d+)/$', BlogPostRudView.as_view(), name='post-rud')
]   
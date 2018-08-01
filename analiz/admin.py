from django.contrib import admin

from .models import Gene, Rsid, Risk_group, Mygroup_name, My_group

# Register your models here.

admin.site.register(Gene)
admin.site.register(Rsid)
admin.site.register(Risk_group)
admin.site.register(Mygroup_name)
admin.site.register(My_group)

# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-08-01 17:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gene_name', models.CharField(db_index=True, max_length=45, unique=True)),
                ('category', models.CharField(blank=True, max_length=45)),
                ('comments', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('urls', models.TextField(blank=True)),
            ],
            options={
                'db_table': 'genes',
            },
        ),
        migrations.CreateModel(
            name='My_groups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rsid', models.CharField(db_index=True, max_length=45, unique=True)),
                ('gene_name', models.CharField(max_length=45)),
                ('risk', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'my_groups',
            },
        ),
        migrations.CreateModel(
            name='Mygroup_name',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45, unique=True)),
            ],
            options={
                'db_table': 'mygroup_name',
            },
        ),
        migrations.CreateModel(
            name='Risk_groups',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rsid', models.CharField(db_index=True, max_length=45, unique=True)),
                ('gene_name', models.CharField(max_length=45)),
                ('risk', models.CharField(max_length=10)),
                ('group', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'risk_group',
            },
        ),
        migrations.CreateModel(
            name='Rsids',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rsid', models.CharField(db_index=True, max_length=45, unique=True)),
                ('category', models.CharField(blank=True, max_length=45)),
                ('txt_major', models.TextField(blank=True)),
                ('txt_minor', models.TextField(blank=True)),
                ('links', models.CharField(blank=True, max_length=255)),
                ('minor_allele', models.CharField(blank=True, max_length=10)),
                ('major_allele', models.CharField(blank=True, max_length=10)),
                ('risk_allele', models.CharField(max_length=10)),
                ('gene_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analiz.Genes')),
            ],
            options={
                'db_table': 'rsid',
            },
        ),
        migrations.AddField(
            model_name='my_groups',
            name='group_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analiz.Mygroup_name'),
        ),
    ]

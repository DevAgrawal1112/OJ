from nturl2path import url2pathname
from django.urls import path
from judge.models import Problem
from . import views

app_name = 'judge'
urlpatterns = [
    path('', views.problems, name='problems'),
    path('problem/<int:problem_id>/', views.problemDetail, name='problem_default'),
    path('problem/<int:problem_id>/submit/', views.submitProblem, name='submit'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
]
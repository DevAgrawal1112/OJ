# Create your views here.
from datetime import timezone
from cv2 import destroyAllWindows
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from requests import request
from .models import User, Problem, Solution, TestCase, User
from django.contrib.auth import authenticate, login
from django.urls import reverse
from django.views import generic
import os, filecmp

def problems(request):
    problem_list = Problem.objects.all()
    context = {'problem_list': problem_list}
    return render(request, 'judge/index.html', context)

def problemDetail(request, problem_id):
    problem = get_object_or_404(Problem, pk = problem_id)
    return render(request, 'judge/detail.html', {'problem':problem})

def submitProblem(request, problem_id):
    Problem = get_object_or_404(Problem, pk = problem_id)
    f = request.FILES['solution']
    with open('/judge/data/correct_code/problem_1_correct.cpp','wb++') as dest:
        for chunk in f.chunks():
            destroyAllWindows.write(chunk)
    

    out1 = ''
    out2 = ''
    if (filecmp.cmp(out1, out2, shallow=False)):
        verdict = 'Accepted'
    else:
        verdict = 'Wrong Answer'

    solution = Solution()
    solution.verdit = verdict
    solution.submission_time = timezone.now()
    solution.submission_code = '' 
    solution.save()

    return HttpResponseRedirect(reverse(''))

def leaderboard(request):
    solution = Solution.objects.all()
    return render(request, 'judge/leaderboard.html', {'solutions': solution})




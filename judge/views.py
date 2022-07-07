# Create your views here.
from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
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

def submitProblem(render, problem_id):
    f = request.FILES['solution']
    with open{'',''} as dest:
        for chunk in f.chunks():
            dest.write(chunk)
    os.system('')
    os.system('')

    out1 = ''
    out2 = ''
    if (filecmp.cmp(out1, out2, shallow=False)):
        verdict = 'Accepted'
    else:
        verdict = 'Wrong Answer'

    solution = Solution()
    solution.verdict = verdict
    solution.submission_time = timezone.now()




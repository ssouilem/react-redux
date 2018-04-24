#!/usr/bin/python
# -*- coding: utf-8 -*-
from argparse import ArgumentParser
from os import system, getcwd, chdir
import deploylib
from decorators import timing


@timing
def push_to_prod(args):
    compile_javascript(args.env)
    chdir('{}/dist/'.format(getcwd()))
    deploylib.push_to_cf(args.env, args.apikey, args.space)


@timing
def compile_javascript(env):
    system('npm prune && npm update')
    system('MODULE={} npm run compile'.format(env))


if __name__ == '__main__':
    parser = ArgumentParser(description='Client deploy scripts')
    parser.add_argument('--apikey', metavar='bx apikey', type=str, required=True)
    parser.add_argument('--space', metavar='bx spaces', type=str, required=True)
    parser.add_argument('--env', metavar='gitlab environment', type=str, required=True)
    args = parser.parse_args()
    if args.apikey and args.space and args.env:
        push_to_prod(args)
    else:
        raise Exception('Need credentials!')

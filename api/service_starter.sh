#!/bin/bash
gunicorn --chdir api api.app:app -b 0.0.0.0:5000
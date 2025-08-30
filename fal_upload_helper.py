#!/usr/bin/env python3
import os
import sys
import json

def validate_file(file_path):
    """Validate file exists and is readable"""
    if not os.path.exists(file_path):
        return False, f"File not found: {file_path}"
    if not os.path.isfile(file_path):
        return False, f"Not a file: {file_path}"
    if not os.access(file_path, os.R_OK):
        return False, f"File not readable: {file_path}"
    return True, "File is valid"

def get_file_info(file_path):
    """Get file information"""
    stat = os.stat(file_path)
    return {
        "path": file_path,
        "size": stat.st_size,
        "name": os.path.basename(file_path),
        "extension": os.path.splitext(file_path)[1]
    }
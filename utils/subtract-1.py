import os
import re

root_dir = "/Users/tbedford/link-repl/docs/content"
file_ext = ".textile"
#file_ext = ".md"
#file_ext = ".code"

# For compare data
#root_dir = "/Users/tbedford/link-repl/docs/data"
#file_ext = "compare.yaml"


def open_log (filename):
    print("Opening log file: ", filename)
    f = open (filename, mode='w', encoding='utf-8')
    return f

def close_log (f):
    print("Closing log file")
    f.close()

def write_log(f, msg):
    msg = msg + '\n'
    f.write(msg)
    f.flush()
    return

def find_files(root):
    md_files = []
    for root, dirs, files in os.walk(root):
        for f in files:
            if f.endswith(file_ext):
                md_files.append(os.path.join(root, f))
    return md_files

def read_file(filename):
    print("Opening >%s< ..." % filename)
    f = open (filename, 'r')
    source = f.read()
    f.close()
    return source

def write_file(filename, source):
    f = open (filename, mode='w', encoding='utf-8')
    f.write(source)
    f.close()
    return

logfile = open_log("replacements.log")

# Replace in files
files = find_files(root_dir)
link = r'(https://knowledge.ably.com/\S*)-1'
for f in files:
    write_log(logfile, f)
    source = read_file(f)
    source_out, n = re.subn(link, r'\1', source, re.MULTILINE)
    write_log(logfile, 'Renamed: ' + str(n) + ' links')
    # write source out to file
    #write_file(f, source_out)

close_log(logfile)

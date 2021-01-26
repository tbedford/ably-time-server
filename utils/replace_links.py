import os
import re

root_dir = "/Users/tbedford/checkouts/docs/content"
redirects_file = "/Users/tbedford/Downloads/redirects.tsv"

def open_log (filename):
    print("Opening log file: ", filename)
    f = open (filename, mode='w', encoding='utf-8')
    return f

def close_log (f):
    print("Closing log file")
    f.close()

def write_log(f, filename, link1, link2):
    msg = "{%s} -- {%s} -- {%s}\n" % (filename, link1, link2)
    f.write(msg)
    f.flush()

def find_files(root):
    md_files = []
    for root, dirs, files in os.walk(root):
        for f in files:
            if f.endswith(".textile"):
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

# Build link array from redirects file (TSV)
link_array = []
links = read_file(redirects_file)
i = 0
for line in links.splitlines():
    link1, link2 = line.split('\t', 1) # maxsplit = 1
    link_array.append([link1, link2])
    i = i + 1
print("Items in link_array: %d" % (i))

# Replace in files
files = find_files(root_dir)
for f in files:
    source = read_file(f)
    for link in link_array:
        matches = re.findall(link[0], source)
        if len(matches) > 0: 
            source = source.replace(link[0], link[1])
            write_log(logfile, f, link[0], link[1])
    print("----------")
    # write source out to file
    # write_file(f, source)

close_log(logfile)

#!/usr/bin/python
import sys
import os
import codecs
from optparse import OptionParser

def main():
    global ops
    op=OptionParser(usage='usage: %prog [OPTION]... [FILE]', version="%prog 0.0.1")
    op.description="Convert csv-like table(from file or stdin) to self-parsing javascript code:"+\
                "Object made of arrays.\n "+\
                "The table file must have a header as its first line."+\
                "And the header will be used to name the generated arrays"
                
    op.add_option('-f',dest='FS', default="|",
            help='sets the field separator of incoming file,which is by default "|" ',
            action = 'store',type="string")
    op.add_option('-o',dest='objname', default="obj",
            help='names the target object. If it is omitted, if the table text will be read from '+\
            "a file, the file's base name will became the object name, otherwise 'obj' will be used",
            action = 'store',type="string")
    op.add_option('-s',dest='OFS',
            help='sets the field separater of output string (intermediate), '+\
            'which is by default "~"',default="~", action = 'store',type="string")
    (ops,args)=op.parse_args()
    if len(args)==0:
        process(sys.stdin)
    else:
        if not os.path.isfile(args[0]):
            exit(1)
        else:
            if ops.objname=='obj':
                ops.objname==os.path.splitext(os.path.basename(args[0]))[0]
            with open(args[0]) as coming:
                process(coming)

def process(f):
    #TODO: error checking
    #header stuff
    l=f.readline()
    if l=="":return
    headers = l.strip().split(ops.FS)
    nf=len(headers)
    obj={}
    for h in headers:
        obj[h]=[]
    #populate arrays
    interv=100 #break very long string
    cnt=0
    while True:
        l=f.readline()
        if l=="":break
        cnt+=1
        fields=l.strip().split(ops.FS)
        if len(fields)!=nf:continue
        for n in range(nf):
            obj[headers[n]].append(("\\\n" if(cnt%interv==0) else '') + fields[n])
            
    #generate target string
    sys.stdout.write("var " + ops.objname + 
    ";\n if("+ops.objname +"===undefined)"+ops.objname+"={};\n");
    
    for h in headers:
        sys.stdout.write(ops.objname+"." + h + '="' + ops.OFS.join(obj[h]) + 
        '".split("' + ops.OFS  + '");\n')
    

    
   




if __name__=='__main__':
    main()
import os
from jinja2 import Template

class Doc:
    def __init__(self, ep, desc):
        self.endpoint = ep
        self.desc = desc
    def __repr__(self):
        return self.endpoint

def get_docs(module):
    lines = map(lambda x: x.strip(), open(module).readlines())
    for i in range(len(lines)):
        if "end-point" in lines[i]:
            ep = lines[i].split()[-1]
            i += 1
            desc = ""
            while lines[i].startswith("//"):
                desc += lines[i].replace("//", "").strip()
                i += 1
            yield Doc(ep, desc)

def main():
    modules = ["app/" + f for f in os.listdir("app") if os.path.isfile("app/" + f)]
    docs = []
    for module in modules:
        for doc in get_docs(module):
            docs.append(doc)
    docs = sorted(docs, key=lambda x: x.endpoint)
    t = Template(open("index.html").read())
    out = t.render(docs = docs)
    print out

if __name__ == "__main__":
    main()

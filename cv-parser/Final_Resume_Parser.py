from pdfminer.high_level import extract_text
import spacy
from spacy import displacy
import json

def convertToText(fname):
    return extract_text(fname)

nlp = spacy.load("en_core_web_lg")

skills = "jz_skill_patterns.jsonl"

ruler = nlp.add_pipe("entity_ruler", before="ner")

ruler.from_disk(skills)

text = convertToText("../cv-backend/storage/temp.pdf")
doc = nlp(text)
#displacy.serve(doc, style="ent")
skillArrWithDups = []
for ent in doc.ents:
    if ent.label_ == 'SKILL':
        skillArrWithDups.append(ent.text)

for i in range(len(skillArrWithDups)):
    skillArrWithDups[i] = skillArrWithDups[i].upper()
pureSkillArr = list(dict.fromkeys(skillArrWithDups))

print("Skills")
print(pureSkillArr)

results = {
    "skills": pureSkillArr
}
resultData = json.dumps(x)
f = open("../cv-backend/storage/results.json", "w")
f.write(resultData)
f.close()
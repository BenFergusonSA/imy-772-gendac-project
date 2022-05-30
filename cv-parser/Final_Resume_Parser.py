import sys, fitz
import spacy
from spacy import displacy

def convertToText(fname):
    doc = fitz.open(fname)
    text=""
    for page in doc:
        text = text + str(page.get_text())
    tx = " ".join(text.split("\n"))
    return tx

nlp = spacy.load("en_core_web_lg")

skills = "jz_skill_patterns.jsonl"

ruler = nlp.add_pipe("entity_ruler", before="ner")

ruler.from_disk(skills)

text = convertToText("Leason_Rykaart_CV.pdf")
doc = nlp(text)
#displacy.serve(doc, style="ent")
skillArrWithDups = []
for ent in doc.ents:
    if ent.label_ == 'SKILL':
        skillArrWithDups.append(ent.text)

for i in range(len(skillArrWithDups)):
    skillArrWithDups[i] = skillArrWithDups[i].upper()
print("Array with duplicates")
print(skillArrWithDups)

pureSkillArr = list(dict.fromkeys(skillArrWithDups))

print('----------------')
print("Array without duplicates")
print(pureSkillArr)
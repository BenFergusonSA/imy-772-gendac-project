from pdfminer.high_level import extract_text
import spacy
from spacy import displacy

def convertToText(fname):
    return extract_text(fname)

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
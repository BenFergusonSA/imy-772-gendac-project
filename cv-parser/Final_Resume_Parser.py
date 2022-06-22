from pdfminer.high_level import extract_text
import spacy
from spacy import displacy
import json
import re

def convertToText(fname):
    return extract_text(fname)

EDUCATION = [
    'B.Eng', 'BEng' ,'B.Eng Electrical', 'B.Eng Electronic', 'B.Eng Computer', 'BEng Electrical', 'BEng Electronic', 'BEng Computer',
    'BSc Computer Science', 'B.Sc Computer Science', 'BCom Informatics', 'B.Com Informatics', 'BIS',
    'B Information Systems', 'BIT', 'B Information Technology', 'Multimedia', 'BSc', 'B.Sc', 'BSc Information and Knowledge Systems', 'B.Sc Information and Knowledge Systems'
]

nlp = spacy.load("en_core_web_lg")

skills = "jz_skill_patterns.jsonl"

ruler = nlp.add_pipe("entity_ruler", before="ner")

ruler.from_disk(skills)

text = convertToText("../cv-backend/storage/temp.pdf")
doc = nlp(text)

#filters unnecessary stop words and remove special characters
filtered = [token.text for token in doc if token.is_stop == False]
text_no_punt = [re.sub('[^a-zA-Z0-9]+', '', _) for _ in filtered]

#extract skills from document
skillArrWithDups = []
for ent in doc.ents:
    if ent.label_ == 'SKILL':
        skillArrWithDups.append(ent.text)

for i in range(len(skillArrWithDups)):
    skillArrWithDups[i] = skillArrWithDups[i].upper()

#remove skill duplicates
pureSkillArr = list(dict.fromkeys(skillArrWithDups))

#extract education from document
applicantEdu = []
for i in text_no_punt:
    for j in EDUCATION:
        if j.lower() in i.lower():
            applicantEdu.append(j)

#remove education duplicates
applicantEdu = list(dict.fromkeys(applicantEdu))

print("Education")
print(applicantEdu)


print("Skills")
print(pureSkillArr)

results = {
    "skills": pureSkillArr,
    "education": applicantEdu
}
resultData = json.dumps(results)
f = open("../cv-backend/storage/results.json", "w")
f.write(resultData)
f.close()
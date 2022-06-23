from pdfminer.high_level import extract_text
import spacy
import json

def convertToText(fname):
    return extract_text(fname)

nlp = spacy.load("en_core_web_lg")

skills = "jz_skill_patterns.jsonl"

ruler = nlp.add_pipe("entity_ruler", before="ner")

ruler.from_disk(skills)

text = convertToText("../cv-backend/storage/temp.pdf")
doc = nlp(text)

#extract skills from document
skillArrWithDups = [ent.text for ent in doc.ents if ent.label_ == 'SKILL']
[skill.upper() for skill in skillArrWithDups]

#remove skill duplicates
pureSkillArr = set(skillArrWithDups)

print("Skills")
print(pureSkillArr)

results = {
    "skills": pureSkillArr
}
resultData = json.dumps(results)
print(resultData)
f = open("../cv-backend/storage/results.json", "w")
f.write(resultData)
f.close()
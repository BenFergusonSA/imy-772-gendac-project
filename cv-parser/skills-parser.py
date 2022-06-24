from pdfminer.high_level import extract_text
import spacy
import json
from pathlib import Path

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

def convertToText(fname):
    return extract_text(fname)

nlp = spacy.load("en_core_web_lg")

skillsFile = "./jz_skill_patterns.jsonl"

pathToSkills = Path(skillsFile)

fileExists = pathToSkills.is_file();

print("Skills file exists?")
print(fileExists)

ruler = nlp.add_pipe("entity_ruler", before="ner")

ruler.from_disk(pathToSkills)

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
resultData = json.dumps(results, cls=SetEncoder)
print(resultData)
f = open("../cv-backend/storage/skills-results.json", "w")
f.write(resultData)
f.close()
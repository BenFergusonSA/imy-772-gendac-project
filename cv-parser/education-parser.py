from pdfminer.high_level import extract_text
import spacy
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

ruler = nlp.add_pipe("entity_ruler", before="ner")

text = convertToText("../cv-backend/storage/temp.pdf")
doc = nlp(text)

filtered = [token.text for token in doc if token.is_stop == False]
text_no_punt = [re.sub('[^a-zA-Z0-9]+', '', _) for _ in filtered]
text_no_punt = [x.lower() for x in text_no_punt]

applicantEdu = [i for i in EDUCATION if i.lower() in text_no_punt]
applicantEdu = set(applicantEdu)

print("education")
print(applicantEdu)

results = {
    "education": applicantEdu
}
resultData = json.dumps(results)
print(resultData)
f = open("../cv-backend/storage/education-results.json", "w")
f.write(resultData)
f.close()
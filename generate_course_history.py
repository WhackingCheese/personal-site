from bs4 import BeautifulSoup
import json

keys = [
    "semester",
    "course_name",
    "course_number",
    "credits",
    "grade",
    "passed",
    "distance_education",
    "test_site"
]

keys_dropped = [
    "grade",
    "distance_education",
    "test_site"
]

data = {
    "is": {
        "title": "Mikolaj Cymcyk",
        "subtitle": "Yfirlit á núverandi og loknum áföngum fyrir Tölvunarfræði BS hjá Háskóla Íslands.",
        "degree": "Tölvunarfræði, BS",
        "headers": [
            "Áfangi",
            "Áfanganúmer",
            "Einingar",
            "Lokið"
        ],
        "courses": [],
        "keys": []
    },
    "en": {
        "title": "Mikolaj Cymcyk",
        "subtitle": "Overview of current and completed courses towards my Computer Science BS at the University of Iceland.",
        "degree": "Computer Science, BS",
        "headers": [
            "Course",
            "Number",
            "Units",
            "Finished"
        ],
        "courses": [],
        "keys": []
    }
}

def generate_json():
    generate_dict("ugla_en.html", "en")
    generate_dict("ugla_is.html", "is")
    data = combine_data()
    with open("courses.json", "w", encoding="utf-8") as fp:
        fp.write(json.dumps(data))
        fp.close()

def combine_data():
    out = {}
    for key in data["is"]:
        if key in ["title", "subtitle", "degree"]:
            if data["en"][key] != data["is"][key]:
                out[key] = {"en": data["en"][key], "is": data["is"][key]}
            else:
                out[key] = data["en"][key]
        elif key == "headers":
            out[key] = {"en": data["en"][key], "is": data["is"][key]}
        elif key == "courses":
            out[key] = []
            for i in range(len(data["is"][key])):
                d = {}
                d["semester"] = {"en": data["en"][key][i]["semester"], "is": data["is"][key][i]["semester"].capitalize()}
                d["data"] = []
                for j in range(len(data["is"][key][i]["data"])):
                    a = {}
                    for key2 in data["is"][key][i]["data"][j]:
                        if key2 == "semester":
                            continue
                        if data["is"][key][i]["data"][j][key2] != data["en"][key][i]["data"][j][key2]:
                            a[key2] = {
                                "en": data["en"][key][i]["data"][j][key2],
                                "is": data["is"][key][i]["data"][j][key2]
                            }
                        else:
                            a[key2] = data["en"][key][i]["data"][j][key2]
                    d["data"].append(a)
                out[key].append(d)
    out["keys"] = data["is"]["keys"]
    return out

def generate_dict(html_name, lang):
    global data
    with open(html_name, "r", encoding="utf-8") as fp:
        soup = BeautifulSoup(fp, "html.parser")
        data[lang] = parse_html(soup, data[lang])

def parse_html(fp, data):
    key = list(data.keys())[4]
    headers = [item.text for item in fp.find("thead").find_all("th")]
    headers.pop()
    c = {}
    d = []
    for nam in fp.find("tbody").find_all("tr"):
        x = 0
        for item in nam.find_all("td"):
            if x == 8:
                continue
            c[keys[x]] = item.text
            x += 1
        if "grade" in c:
            if c["grade"] == "Withd." or c["grade"] == "Úrsögn":
                c = {}
                continue
        for k in keys_dropped:
            if k in c:
                del c[k]
        if len(c.keys()) > 1:
            if len(d) > 0:
                if d[-1]["semester"] == c["semester"]:
                    d.append(c)
                else:
                    data[key].append({
                            "semester": d[-1]["semester"],
                            "data": d
                        })
                    d = []
                    d.append(c)
            else:
                d.append(c)
        c = {}
    data[key].append({
            "semester": d[-1]["semester"],
            "data": d
        })
    data["keys"] = list(set(keys) - set(keys_dropped))
    return data

generate_json()

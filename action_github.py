import requests
from bs4 import BeautifulSoup


def get_li_texts(html):
    soup = BeautifulSoup(html, 'lxml')
    li_list = soup.findAll('h3',
                           class_="discussion-item-header f5 text-normal")

    li_texts = []
    for li in li_list:
        text = li.get_text().strip()
        text = text.replace("\n", "")
        li_texts.append(text)
    return li_texts

url = input("Please input the full URL:")
response = requests.get(url)
response = response.text
texts = get_li_texts(response)
print(texts)

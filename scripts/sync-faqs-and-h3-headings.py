import os
import re
import json

def generate_faq_html(faqs):
    html = []
    html.append('<!-- SHARED FAQ COMPONENT: Synchronized with data/faqs.json. Update all service pages & about.html together. -->')
    html.append('<div class="accordion" id="accordionExample">')
    html.append('  <div class="row">')
    
    col1 = faqs[:3]
    col2 = faqs[3:]
    
    html.append('    <div class="col-md-6">')
    for f in col1:
        html.append(f'''      <div class="card">
        <div class="card-header" id="{f['headingId']}">
          <h3 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#{f['id']}" aria-expanded="false" aria-controls="{f['id']}">
              {f['question']}
              <span class="icons">
                <i class="icofont-plus"></i>
                <i class="icofont-minus"></i>
              </span>
            </button>
          </h3>
        </div>
        <div id="{f['id']}" class="collapse" aria-labelledby="{f['headingId']}" data-parent="#accordionExample">
          <div class="card-body">
            {f['answer']}
          </div>
        </div>
      </div>''')
    html.append('    </div>')
    
    html.append('    <div class="col-md-6">')
    for f in col2:
        html.append(f'''      <div class="card">
        <div class="card-header" id="{f['headingId']}">
          <h3 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#{f['id']}" aria-expanded="false" aria-controls="{f['id']}">
              {f['question']}
              <span class="icons">
                <i class="icofont-plus"></i>
                <i class="icofont-minus"></i>
              </span>
            </button>
          </h3>
        </div>
        <div id="{f['id']}" class="collapse" aria-labelledby="{f['headingId']}" data-parent="#accordionExample">
          <div class="card-body">
            {f['answer']}
          </div>
        </div>
      </div>''')
    html.append('    </div>')
    
    html.append('  </div>')
    html.append('</div>')
    return '\n'.join(html)

def process_page(filepath, faq_html):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Replace accordion block inside #genral or faq section
    if '<div class="accordion" id="accordionExample">' in content:
        content = re.sub(
            r'(?:<!-- SHARED FAQ COMPONENT[\s\S]*?-->\s*)?<div class="accordion" id="accordionExample">[\s\S]*?</div>\s*</div>\s*</div>\s*(?=</div>\s*</div>\s*</section>|</div>\s*</div>\s*</div>\s*</section>|</div>\s*</div>\s*</div>\s*</div>|\s*</div>\s*</div>\s*</div>\s*</div>)',
            faq_html + '\n',
            content
        )

    # Also convert any remaining <h2 class="mb-0"> inside .card-header to <h3 class="mb-0">
    content = re.sub(r'<h2 class="mb-0">(\s*<button[^>]*card-header|\s*<button)', r'<h3 class="mb-0">\1', content)
    content = re.sub(r'</h2>(\s*</div>\s*<div id="collapse)', r'</h3>\1', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Synchronized FAQs with H3 headings in: {filepath}")

def main():
    with open('data/faqs.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    faq_html = generate_faq_html(data['faqs'])
    
    target_files = [
        "about.html",
        "geriatric-care-services-for-elders.html",
        "nursing-services-for-elders.html",
        "physiotherapy-services-for-elders.html",
        "assisted-living-support-services-for-elders.html"
    ]
    
    for tf in target_files:
        process_page(tf, faq_html)

if __name__ == '__main__':
    main()

# LLM Translation Prompt Template

Use this prompt template with Claude, ChatGPT, or other LLMs to generate translations.

## Prompt Template

```
You are a professional translator. Translate the following manifest/leaflet text to [LANGUAGE_NAME] ([NATIVE_NAME]).

Requirements:
1. Maintain the serious, formal tone appropriate for a political/social manifest
2. Keep paragraph structure exactly as shown (4 paragraphs)
3. Preserve the meaning and emotional impact
4. Use natural, native phrasing (not literal translation)
5. Keep length similar to the original
6. Return ONLY the translation in valid JSON format

Original text in English:
---
Title: Our Manifest

Paragraph 1:
This is a placeholder for your first paragraph. Replace this text with your actual message. You can write about your cause, mission, or any important information you want to share.

Paragraph 2:
This is the second paragraph. Add more details about your message here. Explain the context, background, or reasoning behind your initiative.

Paragraph 3:
This is the third paragraph. You can include calls to action, important facts, or additional information that supports your message.

Paragraph 4:
Final paragraph with concluding thoughts. Summarize your key points or provide next steps for people who want to get involved or learn more.
---

Also translate these UI elements:
- "Scan to Learn More"
- "Support This Message"
- "Vote"
- "Current votes:"
- "Bitcoin:"
- "Copy"

Return the translation in this exact JSON format:

{
  "title": "Translated title",
  "paragraphs": [
    "Translated paragraph 1",
    "Translated paragraph 2",
    "Translated paragraph 3",
    "Translated paragraph 4"
  ],
  "qrTitle": "Translated: Scan to Learn More",
  "voteTitle": "Translated: Support This Message",
  "voteButton": "Translated: Vote",
  "voteCount": "Translated: Current votes:",
  "donationText": "Bitcoin:",
  "copyButton": "Translated: Copy"
}
```

## Batch Translation Workflow

### Option 1: Use Claude API (Recommended)

```bash
# Install Claude CLI or use API directly
# Process all languages in a loop

for lang in zh hi es ar bn fr pt ru ur; do
  # Call API with prompt for each language
  # Save output to translations-${lang}.json
done
```

### Option 2: Manual LLM Translation

1. Copy the prompt template above
2. Replace `[LANGUAGE_NAME]` and `[NATIVE_NAME]` with target language
3. Replace the English content with your actual manifest text
4. Paste into Claude/ChatGPT
5. Copy JSON response
6. Add to `script.js` translations object

### Option 3: Use Translation Script

Run the included `translate.js` script (if you have Claude API key):

```bash
# Set your API key
export ANTHROPIC_API_KEY=your_key_here

# Run batch translation
node translate.js

# This will generate translations for all Tier 1 languages
```

## Quality Check Prompt

After getting translations, use this prompt to verify quality:

```
Review this [LANGUAGE] translation for a political manifesto/leaflet.
Check for:
1. Grammatical correctness
2. Natural, native phrasing
3. Appropriate formal tone
4. Cultural sensitivity
5. Accurate meaning preservation

Original (English): [TEXT]
Translation ([LANGUAGE]): [TRANSLATED TEXT]

Suggest improvements if needed.
```

## Adding Translations to Code

Once you have the JSON translations:

1. Open `script.js`
2. Find the `translations` object
3. Add new language using the code from `language-codes.json`:

```javascript
translations.zh = {
  title: "我们的宣言",
  paragraphs: [
    "这是第一段的占位符...",
    // ... more paragraphs
  ],
  qrTitle: "扫描了解更多",
  voteTitle: "支持此信息",
  voteButton: "投票",
  voteCount: "当前票数：",
  donationText: "比特币：",
  copyButton: "复制"
};
```

4. Update `index.html` to add the language option:

```html
<option value="zh">中文</option>
```

## Pro Tips

- **Start with Tier 1** (top 10 languages) - covers 67% of world population
- **Test RTL languages** (Arabic, Urdu, Farsi) - they need special CSS
- **Use native speakers** for final review when possible
- **Keep backup** of all translations in separate JSON files
- **Version control** - commit each language addition separately

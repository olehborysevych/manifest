# Language Coverage Strategy

## Top Languages by Total Speakers (Native + Non-Native)
*Ordered by global reach - covers ~95% of world population*

| Rank | Language Code | Language Name | Total Speakers | % World Pop | Cumulative % |
|------|---------------|---------------|----------------|-------------|--------------|
| 1    | en            | English       | ~1.5 billion   | 18.8%       | 18.8%        |
| 2    | zh            | Chinese (Mandarin) | ~1.1 billion | 13.8%    | 32.6%        |
| 3    | hi            | Hindi         | ~600 million   | 7.5%        | 40.1%        |
| 4    | es            | Spanish       | ~560 million   | 7.0%        | 47.1%        |
| 5    | ar            | Arabic        | ~274 million   | 3.4%        | 50.5%        |
| 6    | bn            | Bengali       | ~265 million   | 3.3%        | 53.8%        |
| 7    | fr            | French        | ~280 million   | 3.5%        | 57.3%        |
| 8    | pt            | Portuguese    | ~258 million   | 3.2%        | 60.5%        |
| 9    | ru            | Russian       | ~258 million   | 3.2%        | 63.7%        |
| 10   | ur            | Urdu          | ~230 million   | 2.9%        | 66.6%        |
| 11   | id            | Indonesian    | ~199 million   | 2.5%        | 69.1%        |
| 12   | de            | German        | ~135 million   | 1.7%        | 70.8%        |
| 13   | ja            | Japanese      | ~126 million   | 1.6%        | 72.4%        |
| 14   | sw            | Swahili       | ~200 million   | 2.5%        | 74.9%        |
| 15   | pa            | Punjabi       | ~125 million   | 1.6%        | 76.5%        |
| 16   | mr            | Marathi       | ~99 million    | 1.2%        | 77.7%        |
| 17   | te            | Telugu        | ~96 million    | 1.2%        | 78.9%        |
| 18   | tr            | Turkish       | ~88 million    | 1.1%        | 80.0%        |
| 19   | ko            | Korean        | ~82 million    | 1.0%        | 81.0%        |
| 20   | ta            | Tamil         | ~86 million    | 1.1%        | 82.1%        |
| 21   | vi            | Vietnamese    | ~85 million    | 1.1%        | 83.2%        |
| 22   | it            | Italian       | ~85 million    | 1.1%        | 84.3%        |
| 23   | th            | Thai          | ~69 million    | 0.9%        | 85.2%        |
| 24   | pl            | Polish        | ~50 million    | 0.6%        | 85.8%        |
| 25   | uk            | Ukrainian     | ~45 million    | 0.6%        | 86.4%        |
| 26   | fa            | Persian (Farsi)| ~77 million   | 1.0%        | 87.4%        |
| 27   | ro            | Romanian      | ~24 million    | 0.3%        | 87.7%        |
| 28   | nl            | Dutch         | ~25 million    | 0.3%        | 88.0%        |
| 29   | el            | Greek         | ~13 million    | 0.2%        | 88.2%        |
| 30   | cs            | Czech         | ~11 million    | 0.1%        | 88.3%        |

## Recommended Strategy

### Tier 1: Essential (Top 10 - 67% coverage)
**Priority for initial launch**
- en, zh, hi, es, ar, bn, fr, pt, ru, ur

### Tier 2: High Impact (Next 10 - adds 15% = 82% total)
**Add these for broader reach**
- id, de, ja, sw, pa, mr, te, tr, ko, ta

### Tier 3: Regional Importance (Next 10 - adds 5% = 87% total)
**Regional significance and cultural importance**
- vi, it, th, pl, uk, fa, ro, nl, el, cs

### Tier 4: Extended Coverage (Optional - brings to ~95%)
Add based on your specific audience or geographic focus

## Translation Workflow

### Using LLM (Claude/GPT) for Translation

```bash
# Prepare your English content
# Use Claude API or ChatGPT to translate in batch

# Example prompt:
"Translate the following manifest text to [LANGUAGE].
Maintain the tone, style, and formatting. Keep it appropriate
for a political/social leaflet:

[YOUR ENGLISH TEXT]

Return only the translation, preserving paragraph breaks."
```

### Quality Assurance
1. **LLM Translation** - Get initial translations from Claude/GPT-4
2. **Native Speaker Review** - Have native speakers review critical languages
3. **A/B Testing** - Test different translations for clarity
4. **Community Input** - Allow suggestions/corrections via GitHub

## File Size Impact

### Current Size Estimate
- English baseline: ~1,000 characters (~1KB)
- Average per language: ~1,200 characters (~1.2KB) including markup

### Size Projections

| Languages | Total Size | Gzipped | Load Time (3G) |
|-----------|------------|---------|----------------|
| 5 langs   | ~6 KB      | ~2 KB   | <0.1s          |
| 10 langs  | ~12 KB     | ~4 KB   | <0.1s          |
| 20 langs  | ~24 KB     | ~8 KB   | <0.2s          |
| 30 langs  | ~36 KB     | ~12 KB  | <0.3s          |

**Verdict: Even 30 languages is TINY** (smaller than a single image!)

## Static vs Dynamic Content

### Static Content (RECOMMENDED) ✅
**Pros:**
- No API calls needed
- Works offline
- Instant language switching
- Perfect for print/leaflet
- Free hosting (no server costs)
- Better SEO (all content indexed)
- No translation API costs

**Cons:**
- Larger initial page load (but still tiny!)
- Updates require redeployment

### Dynamic/API-based ❌
**Not recommended because:**
- Requires server/API costs
- Slower language switching
- Doesn't work offline
- Translation API costs add up
- Overkill for static content

## Implementation Recommendations

1. **Keep all translations in `script.js`** - Still tiny file
2. **Use lazy loading** (optional) - Load only selected language if file gets huge
3. **Add language auto-detection** - Already implemented!
4. **Add RTL support** - For Arabic, Hebrew, Urdu, Farsi
5. **Font considerations** - System fonts cover most scripts

## Next Steps

1. Finalize English content first
2. Use Claude/GPT to generate Tier 1 translations (top 10 languages)
3. Review translations with native speakers if possible
4. Add Tier 2 based on your target audience
5. Monitor analytics to see which languages are actually used

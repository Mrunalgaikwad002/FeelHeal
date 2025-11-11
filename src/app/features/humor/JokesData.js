export const JOKES_EN = {
	happy: [
		"Why did the scarecrow win an award? Because he was outstanding in his field! 🌾😄",
		"What do you call cheese that isn’t yours? Nacho cheese! 🧀😂",
		"Why don’t eggs tell jokes? They’d crack each other up! 🥚😆"
	],
	sad: [
		"Why did the cookie visit the doctor? It was feeling crumby, but it got batter soon 🍪💛",
		"Clouds don’t get invited to parties—they bring their own shade ☁️🙂",
		"A smile is a curve that sets everything straight. So here’s one for you 🙂"
	],
	anxious: [
		"Why did the computer go to therapy? Too many tabs open 🧠💻😂",
		"What did the yoga instructor say to the anxious tea? 'You’re oolong but you’ll be o-kay' 🍵🧘",
		"If overthinking burned calories, we’d all be athletes. Break time! 🧠🏃"
	],
	calm: [
		"I tried to catch fog yesterday. I mist 😌🌫️",
		"Why are trees so relaxed? They meditate every morning with the sunrise 🌳🌅",
		"Quiet joke incoming... shhh... it’s on a break 😴"
	],
	default: [
		"Why did the tomato blush? It saw the salad dressing! 🍅😂",
		"Parallel lines have so much in common… it’s a shame they’ll never meet 📐🙂",
		"I would tell you a construction joke, but I’m still working on it 👷😄"
	]
};

export const JOKES_HI = {
	happy: [
		"गन्ना खुश क्यों था? क्योंकि उसे हर जगह रस मिलता है! 😄",
		"अंडे मज़ाक क्यों नहीं करते? वो खुद ही फूट पड़ेंगे! 🥚😂",
		"क्यों टमाटर लाल पड़ गया? क्योंकि उसने सलाद को ड्रेस करते देख लिया! 🍅😆"
	],
	sad: [
		"कुकी डॉक्टर के पास क्यों गई? उसे ‘crumb-y’ लग रहा था, पर अब batter है 🍪💛",
		"बादल पार्टी में क्यों नहीं बुलाए जाते? वो अपनी ‘छाँव’ साथ लाते हैं ☁️🙂",
		"एक छोटी-सी मुस्कान सब कुछ सीधा कर देती है 🙂"
	],
	anxious: [
		"कम्प्यूटर थेरेपी में क्यों गया? क्योंकि उसके पास बहुत सारे टैब खुले थे 🧠💻😂",
		"ओवरथिंकिंग से कैलोरी जलती होती तो हम एथलीट होते! ब्रेक लें 🧠🏃",
		"चाय घबराई हुई थी—योगा करके ‘ओ-लॉन्ग’ भी ‘ओ-के’ हो जाती है 🍵🧘"
	],
	calm: [
		"मैंने कल धुंध को पकड़ने की कोशिश की… मिस-ट हो गया 😌🌫️",
		"पेड़ इतने शांत क्यों होते हैं? हर सुबह ध्यान करते हैं 🌳🌅",
		"धीमे… चुप्प… ये जोक अभी आराम कर रहा है 😴"
	],
	default: [
		"कबूतर स्मार्टफोन क्यों नहीं यूज़ करता? क्योंकि उसके पास पहले से ‘नेटवर्क’ है 🕊️📶",
		"मेरे पास एक निर्माण जोक है… अभी बन रहा है 👷😄",
		"दो समानांतर लकीरें बहुत मिलती-जुलती होती हैं… अफ़सोस वे मिलती नहीं 📐🙂"
	]
};

export function pick(list) {
	return list[Math.floor(Math.random() * list.length)];
}

// Flatten helpers
function mergeAllBuckets(buckets) {
	return Object.values(buckets || {}).reduce((acc, arr) => acc.concat(arr || []), []);
}

// Mixed joke pools (no categories)
export function getMixedPool(language) {
	return language === "hi" ? mergeAllBuckets(JOKES_HI) : mergeAllBuckets(JOKES_EN);
}



import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@latest';

const longTextInput = document.getElementById('long-text-input');
const generateButton = document.getElementById('generate-button');
const output = document.getElementById('output-div');
const spinner = document.getElementById('spinner');

// Allocate a pipeline for text2text-generation
let generator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');

let pipe = await pipeline('embeddings', 'Xenova/bert-base-multilingual-uncased');

generateButton.removeAttribute('disabled');

generateButton.addEventListener('click', async () => {
    spinner.classList.add('show');
    generateButton.setAttribute("disabled", true);

    const input = longTextInput.value;
	//let features = await pipe(input);
    //console.log(features); // of shape [1, 768]

    //const result = await summarization(input, {
    //    min_length: 50, max_length: 250,
    //});
	//const prompt = '<|im_start|>user
//Here is context:'+input+'. Answer question from it :<|im_end|>
//<|im_start|>assistant';
	const output1 =  await generator(input, { add_special_tokens: true, max_new_tokens: 512, repetition_penalty: 1.2});
	const res=JSON.stringify(output1);
    alert(res)
    
	output.innerHTML = output1.generated_text;
	
    spinner.classList.remove('show');
    generateButton.removeAttribute("disabled");
    output.style.display = 'block';
});

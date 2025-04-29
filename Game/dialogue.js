```javascript
const dialogues = {
  "001": {
    id: "001",
    character: "Narrator",
    line: "As you enter the village, a sense of unease washes over you.",
    emotion: "neutral",
    responses: [
      { option: "Proceed to the marketplace.", next: "002" },
      { option: "Talk to the villager by the fountain.", next: "003" }
    ]
  },
  "002": {
    id: "002",
    character: "Market Vendor",
    line: "Fresh produce, right from the fields! Care to buy some?",
    emotion: "happy",
    responses: [
      { option: "Sure, I'll take some apples.", next: "004" },
      { option: "No, thank you.", next: "005" }
    ]
  }
};

class DialogueManager {
  constructor(dialogues) {
    this.dialogues = dialogues;
    this.currentId = null;
  }

  startDialogue(id) {
    this.currentId = id;
    this.displayDialogue();
  }

  displayDialogue() {
    const dialogue = this.dialogues[this.currentId];
    if (dialogue) {
      console.log(`${dialogue.character} (${dialogue.emotion}): ${dialogue.line}`);
      this.displayResponses(dialogue.responses);
    } else {
      console.error("Dialogue not found.");
    }
  }

  displayResponses(responses) {
    responses.forEach((response, index) => {
      console.log(`${index + 1}: ${response.option}`);
    });
    this.handleResponseInput(responses);
  }

  handleResponseInput(responses) {
    const choice = getInputOption() - 1;
    if (responses[choice]) {
      this.startDialogue(responses[choice].next);
    } else {
      console.log("Invalid choice. Please select a valid option.");
      this.displayResponses(responses);
    }
  }
}

const characterProfiles = {
  "Narrator": { mood: "neutral" },
  "Market Vendor": { mood: "happy" }
};

const localization = {
  en: dialogues,
  es: {}
};

function getInputOption() {
  return 1;
}

export default DialogueManager;
```
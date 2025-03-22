import { Component } from '@angular/core';
import { TextToSpeechService } from '../../services/text-to-speech.service';
import { FormsModule } from '@angular/forms';

// Define the meditation themes as an object
const meditationThemes: { [key: string]: string } = {
  "admiration": "Focus on gratitude for the qualities you admire in others. Embrace the beauty in both yourself and those around you. Allow admiration to cultivate a sense of connection and respect.",
  "amusement": "Focus on the joy of laughter and playfulness. Let go of stress and allow yourself to experience pure, lighthearted joy. Appreciate the humor in life's moments.",
  "anger": "Focus on releasing tension and negative energy. Visualize letting go of anger with each breath. Calm your mind and body, and invite peace into your being.",
  "annoyance": "Focus on self-compassion and patience. Acknowledge your frustration without judgment, and let it melt away with each breath. Cultivate calmness and mindfulness.",
  "approval": "Focus on accepting and appreciating yourself. Let go of self-doubt and embrace the warmth of self-approval. Recognize your strengths and honor them in the present moment.",
  "caring": "Focus on love and kindness. Imagine yourself offering care and compassion to those around you. Allow your heart to expand with empathy and understanding.",
  "confusion": "Focus on finding clarity in the present moment. Let go of the need for immediate answers. Allow your mind to settle and trust that clarity will come with time and patience.",
  "curiosity": "Focus on embracing the unknown with openness. Let go of any fear or resistance. Allow your curiosity to guide you to new perspectives and self-awareness.",
  "desire": "Focus on the power of your inner desires. Allow yourself to embrace what you want, but also recognize that true peace lies in releasing attachment. Cultivate contentment in the present moment.",
  "disappointment": "Focus on healing and acceptance. Acknowledge your feelings of disappointment, but also allow yourself to release them. Cultivate patience and trust that everything unfolds in its own time.",
  "disapproval": "Focus on acceptance and non-judgment. Let go of the need to criticize. Cultivate a mindset of understanding and compassion, both for yourself and others.",
  "disgust": "Focus on letting go of aversion and resistance. Visualize releasing all negative emotions, clearing your mind of unpleasant thoughts. Invite peace and acceptance into your being.",
  "embarrassment": "Focus on self-acceptance and forgiveness. Let go of the need for perfection. Embrace your humanity, understanding that everyone makes mistakes, and those mistakes don't define you.",
  "excitement": "Focus on the joy of anticipation and enthusiasm. Allow your excitement to fuel a sense of energy and gratitude for the opportunities ahead. Stay grounded as you embrace the future.",
  "fear": "Focus on grounding and calming your mind. Let go of fear with each breath. Visualize yourself safe and at peace, letting go of tension and embracing inner strength and confidence.",
  "gratitude": "Focus on the abundance in your life. Reflect on what you are grateful for, and allow this feeling to fill your heart. Let gratitude lead you to inner peace and contentment.",
  "grief": "Focus on healing and compassion. Allow yourself to feel the depth of your grief, but also embrace the healing process. Let go of pain, and invite comfort and understanding into your heart.",
  "joy": "Focus on the present moment and the beauty of life. Allow your joy to grow with each breath, spreading positivity and warmth throughout your body. Embrace happiness without resistance.",
  "love": "Focus on the love within you and around you. Let this love fill your heart and spread through your entire being. Allow yourself to feel connected, compassionate, and at peace.",
  "nervousness": "Focus on calming your body and mind. With each deep breath, let go of tension and nervous energy. Visualize yourself in a calm, peaceful space, embracing the present moment.",
  "optimism": "Focus on the positive potential in your life. Visualize your goals unfolding and trust in the future. Cultivate hope, and allow optimism to bring a sense of peace and excitement.",
  "pride": "Focus on self-empowerment and confidence. Acknowledge your accomplishments and honor your journey. Let pride bring a sense of gratitude and humility, grounding you in your success.",
  "realization": "Focus on the clarity of your insights. Embrace the wisdom you've gained and allow it to guide you forward. Let go of any confusion or doubt, and accept the newfound clarity with gratitude.",
  "relief": "Focus on the ease and comfort of letting go. Breathe deeply and allow yourself to relax fully. Embrace the peace that comes with release and invite calmness into your heart.",
  "remorse": "Focus on self-forgiveness and healing. Acknowledge your feelings of remorse, but allow them to guide you toward growth and understanding. Release guilt and move forward with compassion.",
  "sadness": "Focus on embracing your emotions with kindness. Allow sadness to pass through you without judgment. Cultivate inner peace and comfort, and trust that healing is a journey.",
  "surprise": "Focus on embracing the unexpected with openness. Let go of judgment and allow surprise to bring curiosity and wonder into your experience. Stay present and curious about what comes next."
};

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  imports: [FormsModule],
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  textToSpeak: string = '';

  constructor(private textToSpeechService: TextToSpeechService) {}

  speak(): void {
    if (this.textToSpeak.trim()) {
      this.textToSpeechService.speak(this.textToSpeak);
    }
  }

  onStop(): void {
    this.textToSpeechService.stop();
  }

  // Function to generate a response based on emotion and speak it
  generateResponse(emotion: string): void {
    this.textToSpeak = meditationThemes[emotion] || "I’m not sure how you're feeling, but remember it's okay to have all sorts of emotions.";

    // Call the function to speak the response
    this.speak();
}

}



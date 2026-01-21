interface SendMessageParams {
  consultantId: number;
  content: string;
  sender: 'user' | 'consultant';
}
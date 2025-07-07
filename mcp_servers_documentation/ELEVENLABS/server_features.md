# ElevenLabs MCP Server Features

## Overview
The ElevenLabs MCP server provides access to ElevenLabs' comprehensive AI voice and audio services through 20+ specialized tools. All tools support dynamic credential injection and run from local source code.

## Core Voice Services

### Text-to-Speech Tools
- **`text_to_speech`**: Convert text to speech with customizable voice settings
  - Voice selection by name or ID
  - Adjustable stability, similarity boost, style, speed
  - Multiple output formats (MP3, PCM, Opus)
  - Language support (English, multilingual)

- **`text_to_voice`**: Create voice previews from text descriptions
  - Generate 3 preview variations
  - Custom voice descriptions
  - Auto-generated or custom text

- **`create_voice_from_preview`**: Add generated voices to your library
  - Uses voice ID from `text_to_voice`
  - Custom voice names and descriptions

### Speech-to-Text Tools
- **`speech_to_text`**: Transcribe audio files to text
  - Support for multiple languages
  - Speaker diarization option
  - Save transcript to file or return directly

- **`speech_to_speech`**: Transform audio from one voice to another
  - Voice conversion using audio files
  - Maintains original speech content

## Voice Management

### Voice Library Tools
- **`search_voices`**: Search your personal voice library
  - Search by name, description, labels, category
  - Sort by creation date or name
  - Ascending/descending order

- **`get_voice`**: Get detailed information about a specific voice
  - Voice ID required
  - Returns complete voice metadata

- **`search_voice_library`**: Search the entire ElevenLabs voice library
  - Access to shared/public voices
  - Pagination support
  - Search filtering

### Voice Creation Tools
- **`voice_clone`**: Create instant voice clones from audio files
  - Upload multiple audio samples
  - Custom voice names and descriptions
  - Instant cloning technology

## Audio Processing

### Audio Effects & Generation
- **`text_to_sound_effects`**: Generate sound effects from text descriptions
  - Duration control (0.5-5 seconds)
  - Multiple output formats
  - AI-generated sound effects

- **`isolate_audio`**: Remove background noise from audio files
  - Voice isolation technology
  - Clean audio output

### Audio Playback
- **`play_audio`**: Play audio files directly
  - Supports WAV and MP3 formats
  - Local audio playback

## Conversational AI

### Agent Management
- **`create_agent`**: Create conversational AI agents
  - Custom system prompts and first messages
  - Voice selection and language settings
  - LLM configuration (Gemini, temperature, tokens)
  - ASR quality and streaming optimization

- **`list_agents`**: List all available agents
  - Complete agent inventory
  - Agent metadata

- **`get_agent`**: Get detailed agent information
  - Agent configuration details
  - Voice and conversation settings

### Agent Knowledge & Conversations
- **`add_knowledge_base_to_agent`**: Add knowledge to agents
  - Support for URLs, files, and text
  - Multiple document formats (PDF, DOCX, TXT, HTML)
  - Knowledge base integration

- **`list_conversations`**: List agent conversations
  - Filter by agent ID
  - Pagination and date filtering
  - Conversation metadata

- **`get_conversation`**: Get conversation details with transcript
  - Full conversation history
  - Speaker annotations
  - Timestamp information

### Agent Communication
- **`make_outbound_call`**: Make phone calls using agents
  - Twilio and SIP trunk support
  - E.164 phone number format
  - Agent phone number configuration

- **`list_phone_numbers`**: List available phone numbers
  - Provider information (Twilio/SIP)
  - Agent assignments
  - Phone number metadata

## System & Utility

### Model Information
- **`list_models`**: List all available ElevenLabs models
  - Text-to-speech models
  - Speech-to-text models
  - Model capabilities and features

### Account Management
- **`check_subscription`**: Check subscription status and usage
  - Current plan information
  - Usage statistics
  - Billing details

## Technical Features

### Dynamic Credentials
- **Per-call API key injection**: No environment variables required
- **Key rotation support**: Change API keys mid-session
- **Secure credential handling**: No persistent storage

### Local Source Execution
- **No PyPI dependency**: Runs directly from source code
- **Editable installation**: Supports development modifications
- **Version control**: Track changes in git

### Error Handling
- **Comprehensive error messages**: Clear failure descriptions
- **Cost warnings**: Built-in usage alerts
- **Rate limit handling**: Automatic retry logic

## Cost Considerations

⚠️ **API Usage Costs**:
- Text-to-Speech: ~$0.30 per 1,000 characters
- Speech-to-Text: ~$0.24 per hour
- Voice Cloning: ~$1 per voice
- Agent Calls: ~$0.30 per minute

**Free Tier**: 10,000 characters/month for text-to-speech

## Integration Benefits

- **Seamless Adya Integration**: Works with existing client infrastructure
- **Multi-language Support**: JS/TS and Python clients
- **Streaming Support**: Real-time audio generation
- **Batch Processing**: Handle multiple files efficiently
- **Custom Workflows**: Combine multiple tools for complex audio tasks 
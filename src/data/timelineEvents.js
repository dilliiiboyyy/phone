/**
 * A Day in the Life of Your Phone - Timeline Events & Mini-Interactions
 * School IT Exhibition Project - Grade 9 & Grade 10
 */

export const TIMELINE_EVENTS = [
  {
    id: 'alarm',
    time: '7:00 AM',
    title: 'GOOD MORNING',
    subtitle: 'Your alarm starts ringing.',
    actionLabel: 'TURN OFF ALARM',
    technologies: ['Speaker', 'Clock / Software', 'Battery', 'Processor'],
    flow: ['CLOCK TIMER', 'PROCESSOR', 'AUDIO AMPLIFIER', 'SPEAKER SOUND'],
    didYouKnow: 'Your phone keeps exact track of time even when the screen is dark, triggering actions automatically using timer interrupts on its processor.',
    icon: '⏰',
    themeColor: '#E67E42'
  },
  {
    id: 'navigation',
    time: '8:00 AM',
    title: 'TIME TO LEAVE',
    subtitle: 'You open a map to find the fastest way to school.',
    question: 'How does your phone know where you are?',
    options: [
      { text: 'GPS Satellites', correct: true, icon: '🛰️' },
      { text: 'Camera Lens', correct: false, icon: '📸' },
      { text: 'Speaker', correct: false, icon: '🔊' }
    ],
    flow: ['SATELLITES', 'RADIO SIGNALS', 'PHONE RECEIVER', 'PRECISE LOCATION'],
    explanation: 'GPS uses invisible radio signals from satellites orbiting 20,000 km in space to help your phone estimate its exact location on Earth.',
    icon: '📍',
    themeColor: '#4E8585'
  },
  {
    id: 'camera',
    time: '10:00 AM',
    title: 'SAY CHEESE',
    subtitle: 'You see something cool in science class. Take a photo!',
    actionLabel: 'TAKE PHOTO',
    flow: ['LIGHT PHOTONS', 'CAMERA SENSOR', '12M PIXELS', 'IMAGE PROCESSING', 'SAVED PHOTO'],
    explanation: 'The camera sensor captures incoming light particles and converts them into digital electrical signals that the processor weaves into a crisp picture.',
    icon: '📸',
    themeColor: '#18324A'
  },
  {
    id: 'music',
    time: '1:00 PM',
    title: 'LUNCH BREAK',
    subtitle: 'Time to listen to some music with your friends.',
    question: 'What technology connects your wireless headphones?',
    options: [
      { text: 'Bluetooth', correct: true, icon: '🎧' },
      { text: 'GPS Satellites', correct: false, icon: '🛰️' },
      { text: 'Flashlight LED', correct: false, icon: '🔦' }
    ],
    flow: ['AUDIO FILE', 'PROCESSOR', 'BLUETOOTH RADIO', 'HEADPHONES'],
    explanation: 'Bluetooth uses short-range 2.4 GHz radio waves to beam compressed digital audio wirelessly between nearby devices in your pocket.',
    icon: '🎵',
    themeColor: '#E67E42'
  },
  {
    id: 'gaming',
    time: '5:00 PM',
    title: 'GAME TIME',
    subtitle: 'You launch an action game after finishing homework.',
    question: 'Why might your phone become slightly warm?',
    options: [
      { text: 'The processor and graphics chip are doing heavy work.', correct: true, icon: '🧠' },
      { text: 'GPS satellites are heating up the phone.', correct: false, icon: '🛰️' },
      { text: 'The screen glass is producing sunlight.', correct: false, icon: '☀️' }
    ],
    flow: ['3D GRAPHICS', 'CPU & GPU LOAD', 'ENERGY USE', 'HEAT DISSIPATION'],
    explanation: 'Powerful tasks force the processor to perform billions of calculations every second. This converts stored battery electricity into heat that escapes through the metal phone body.',
    icon: '🎮',
    themeColor: '#18324A'
  },
  {
    id: 'unlock',
    time: '10:00 PM',
    title: 'TIME TO UNLOCK',
    subtitle: 'One last quick check of tomorrow\'s timetable before bed.',
    question: 'Which technology helps verify your identity instantly?',
    options: [
      { text: 'Biometric Fingerprint / Face ID', correct: true, icon: '🔐' },
      { text: 'FM Radio Antenna', correct: false, icon: '📻' },
      { text: 'Barometer', correct: false, icon: '🌡️' }
    ],
    flow: ['FINGER / FACE SCAN', 'SECURE ENCLAVE', 'HASH MATCH', 'PHONE UNLOCKED'],
    explanation: 'Biometric sensors measure unique physical characteristics—like fingertip ridge patterns or 3D facial depth points—to verify who you are in milliseconds.',
    icon: '🔐',
    themeColor: '#4E8585'
  }
];

export const DAY_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    scenario: 'Your screen automatically flips when you turn the phone sideways.',
    question: 'What sensor helps detect this tilt?',
    options: [
      { text: 'Gyroscope & Accelerometer', correct: true, icon: '🌀' },
      { text: 'Speaker', correct: false, icon: '🔊' },
      { text: 'Battery', correct: false, icon: '🔋' }
    ],
    explanation: 'Microscopic accelerometers and gyroscopes sense gravity and rotational motion in 3 dimensions.'
  },
  {
    id: 'q2',
    scenario: 'Your phone screen automatically becomes brighter when you step outside.',
    question: 'What helps with this adjustment?',
    options: [
      { text: 'Ambient Light Sensor', correct: true, icon: '☀️' },
      { text: 'Microphone', correct: false, icon: '🎙️' },
      { text: 'Bluetooth Antenna', correct: false, icon: '📡' }
    ],
    explanation: 'An ambient light sensor measures external lux levels to automatically adjust screen backlighting.'
  },
  {
    id: 'q3',
    scenario: 'You open a map app to find directions to a new place.',
    question: 'Which technology helps estimate your real-time location?',
    options: [
      { text: 'GPS Satellites', correct: true, icon: '📍' },
      { text: 'Flashlight LED', correct: false, icon: '🔦' },
      { text: 'Vibration Motor', correct: false, icon: '📳' }
    ],
    explanation: 'GPS calculates position by comparing radio signals transmitted from multiple orbiting satellites.'
  }
];

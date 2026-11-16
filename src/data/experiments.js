/**
 * Exhibition Experiments Data
 * Created for the Grade 9 & 10 School IT Exhibition
 */

export const EXPERIMENTS = [
  {
    id: 'motion',
    number: 1,
    title: 'MOTION DETECTOR',
    shortName: 'Motion',
    icon: '🌀',
    question: 'Why does your screen rotate?',
    challenge: 'How does your phone know it moved?',
    oneLiner: 'Tilt or drag the phone.',
    tech: 'Accelerometer & Gyroscope',
    color: '#E67E42',
    explanation: 'Your phone uses motion sensors like the accelerometer and gyroscope to detect movement, tilt, and rotation hundreds of times every second.'
  },
  {
    id: 'gps',
    number: 2,
    title: 'GPS LOCATION',
    shortName: 'GPS',
    icon: '📍',
    question: 'How does your phone know where you are?',
    challenge: 'How does your phone estimate its location?',
    oneLiner: 'Identify the technology and lock on to satellites.',
    tech: 'Global Positioning System (Satellites)',
    color: '#4E8585',
    explanation: 'GPS uses invisible radio signals from satellites orbiting 20,000 km above Earth to calculate your exact position down to a few meters.'
  },
  {
    id: 'camera',
    number: 3,
    title: 'CAMERA SENSOR',
    shortName: 'Camera',
    icon: '📸',
    question: 'How does a camera create an image?',
    challenge: 'How does a camera sensor see?',
    oneLiner: 'Watch millions of tiny color pixels combine.',
    tech: 'CMOS Image Sensor & Pixels',
    color: '#18324A',
    explanation: 'A camera sensor captures photons of light and converts them into millions of microscopic colored pixels that form a digital photograph.'
  },
  {
    id: 'microphone',
    number: 4,
    title: 'MICROPHONE',
    shortName: 'Microphone',
    icon: '🎙️',
    question: 'How does your phone hear you?',
    challenge: 'How do sound waves become data?',
    oneLiner: 'Make noise or tap simulate to see vibrations.',
    tech: 'MEMS Acoustic Microphone',
    color: '#E67E42',
    explanation: 'A tiny microphone converts sound vibrations from your voice into electrical pulses that the processor turns into digital audio.'
  },
  {
    id: 'light',
    number: 5,
    title: 'LIGHT SENSOR',
    shortName: 'Light',
    icon: '☀️',
    question: 'How does your screen know when to get brighter?',
    challenge: 'How does your screen know it is dark?',
    oneLiner: 'Slide from bright sunlight into a dark room.',
    tech: 'Ambient Light Sensor',
    color: '#4E8585',
    explanation: 'An ambient light sensor detects the brightness of the room and automatically dims or brightens your display to save battery and protect your eyes.'
  },
  {
    id: 'touch',
    number: 6,
    title: 'TOUCHSCREEN',
    shortName: 'Touch',
    icon: '👆',
    question: 'How does your phone know where you tapped?',
    challenge: 'How does the glass sense your finger?',
    oneLiner: 'Tap anywhere on the virtual screen glass.',
    tech: 'Capacitive Glass Grid',
    color: '#18324A',
    explanation: 'Your finger conducts a tiny electrical charge. When you touch the glass, it disrupts the screen electrical field, telling the phone your exact coordinates.'
  },
  {
    id: 'battery',
    number: 7,
    title: 'BATTERY POWER',
    shortName: 'Battery',
    icon: '🔋',
    question: 'Where does all the power go?',
    challenge: 'Which phone activities use the most energy?',
    oneLiner: 'Pick an activity and watch the power drain.',
    tech: 'Lithium-Ion Battery & Power Management',
    color: '#E67E42',
    explanation: 'Different activities use different amounts of power. High brightness screens, 3D graphics, and radio transmissions drain energy much faster than audio.'
  },
  {
    id: 'connection',
    number: 8,
    title: 'WIRELESS CONNECTION',
    shortName: 'Connection',
    icon: '📡',
    question: 'How does your phone communicate?',
    challenge: 'How does your phone talk to other devices?',
    oneLiner: 'Send a message and watch the invisible signal travel.',
    tech: 'Wi-Fi, Bluetooth & Mobile Cellular',
    color: '#4E8585',
    explanation: 'Your phone uses invisible radio frequencies: Bluetooth for nearby accessories, Wi-Fi for your house or school, and 5G cellular antennas for miles away.'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: 'You rotate your phone sideways to watch a video, and the video immediately flips horizontally.',
    question: 'Which sensor detected this change in orientation?',
    options: [
      { text: 'Gyroscope & Accelerometer', correct: true, icon: '🌀' },
      { text: 'Camera lens', correct: false, icon: '📸' },
      { text: 'Microphone', correct: false, icon: '🎙️' }
    ],
    hint: 'This motion sensor detects angles, tilt, and gravitational pull!'
  },
  {
    id: 2,
    scenario: 'You step outside into brilliant midday sunshine, and your phone screen instantly becomes brighter.',
    question: 'Which sensor made your screen adjust?',
    options: [
      { text: 'Ambient Light Sensor', correct: true, icon: '☀️' },
      { text: 'GPS satellite receiver', correct: false, icon: '📍' },
      { text: 'Speaker', correct: false, icon: '🔊' }
    ],
    hint: 'A tiny sensor near the top speaker measures external lux (light intensity).'
  },
  {
    id: 3,
    scenario: 'You answer a phone call and hold the phone against your ear. The screen automatically turns black.',
    question: 'Which sensor stops your cheek from accidentally pressing buttons?',
    options: [
      { text: 'Proximity Sensor', correct: true, icon: '👤' },
      { text: 'Battery sensor', correct: false, icon: '🔋' },
      { text: 'Wi-Fi antenna', correct: false, icon: '📡' }
    ],
    hint: 'It shoots invisible infrared light to detect when an object is very close!'
  },
  {
    id: 4,
    scenario: 'You open a map app in a new city and a blue dot shows your exact street corner.',
    question: 'Which technology helps pinpoint your location?',
    options: [
      { text: 'GPS Satellites', correct: true, icon: '📍' },
      { text: 'Flashlight LED', correct: false, icon: '🔦' },
      { text: 'Vibration motor', correct: false, icon: '📳' }
    ],
    hint: 'It receives timing signals from spacecraft orbiting 20,000 kilometers away.'
  },
  {
    id: 5,
    scenario: 'You rest your index finger on the screen glass and your phone unlocks immediately.',
    question: 'Which biometric technology scanned your unique skin ridges?',
    options: [
      { text: 'Fingerprint Sensor', correct: true, icon: '👆' },
      { text: 'Barometer', correct: false, icon: '🌡️' },
      { text: 'FM Radio tuner', correct: false, icon: '📻' }
    ],
    hint: 'Optical or ultrasonic waves read the microscopic grooves of your fingertip.'
  }
];

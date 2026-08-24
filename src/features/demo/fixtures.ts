import { demoArchiveSchema, type DemoMemorySeed } from "./schema";

const memories = [
  {
    question: "What did your childhood bedroom look like?",
    title: "The Room Under the Eaves",
    answer:
      "My room had a sloped ceiling, pale yellow walls, and a narrow window facing the maple tree. I kept library books in uneven stacks beside the bed.",
    medium: "text_photo",
    date: { type: "life_period", value: "childhood" },
    people: [],
    photoPlaceholder: "A sunlit attic bedroom with a quilt and stacked books",
  },
  {
    question: "What food did your family always have at home?",
    title: "The Blue Tin of Oatmeal",
    answer:
      "There was always oatmeal in a blue tin above the stove. My father added sliced apples on cold mornings and called it our winter fuel.",
    medium: "voice",
    date: { type: "approximate_year", value: 1974 },
    people: ["person-father"],
    transcript:
      "There was always oatmeal in that blue tin, and Dad would slice apples into it when the windows were frosty.",
  },
  {
    question: "Who was the funniest person in your family growing up?",
    title: "Aunt June's Straight Face",
    answer:
      "Aunt June told impossible stories without smiling, then waited for everyone else to notice the absurd detail. Her pauses were funnier than the punch lines.",
    medium: "text",
    date: { type: "age", value: 9 },
    people: ["person-aunt-june"],
  },
  {
    question: "What did your family usually do on weekends?",
    title: "Saturday at Pine Lake",
    answer:
      "Most Saturdays we packed sandwiches and drove to Pine Lake. We skipped stones, read on the dock, and stayed until the air cooled.",
    medium: "photo",
    date: { type: "approximate_year", value: 1976 },
    people: ["person-mother", "person-father", "person-brother"],
    photoPlaceholder:
      "Four fictional family members sitting at the end of a wooden dock",
  },
  {
    question: "Who was your best friend when you were ten?",
    title: "Mara and the Sidewalk Maps",
    answer:
      "Mara lived three doors down. We drew enormous cities in chalk across both driveways and assigned every crack in the pavement a street name.",
    medium: "voice_photo",
    date: { type: "age", value: 10 },
    people: ["person-mara"],
    transcript:
      "Mara and I made chalk cities so large that both families had to park on the street until it rained.",
    photoPlaceholder: "Colorful chalk streets covering a suburban driveway",
  },
  {
    question: "What smell instantly takes you somewhere else?",
    title: "Cedar Shavings",
    answer:
      "The smell of cedar takes me to my grandfather's workshop, where curls of wood gathered beneath the bench and every jar had a handwritten label.",
    medium: "text",
    date: { type: "life_period", value: "childhood summers" },
    people: ["person-grandfather"],
  },
  {
    question: "What piece of clothing did you wear constantly?",
    title: "The Green Canvas Jacket",
    answer:
      "At fourteen I wore a green canvas jacket in nearly every season. One pocket held bus transfers and the other held folded song lyrics.",
    medium: "photo",
    date: { type: "age", value: 14 },
    people: [],
    photoPlaceholder: "A worn green canvas jacket hanging from a wooden peg",
  },
  {
    question:
      "Where did you go when you wanted to get out of the house as a teenager?",
    title: "The Back Table at Oriole Cafe",
    answer:
      "I went to the Oriole Cafe and ordered tea I barely touched. The back table was ours after school, close enough to the jukebox to argue about every song.",
    medium: "voice",
    date: { type: "year", value: 1982 },
    people: ["person-mara"],
    transcript:
      "The Oriole had a back table by the jukebox, and we acted as if reserving it was our first adult responsibility.",
  },
  {
    question: "What was the first thing you bought with money you earned?",
    title: "A Red Portable Radio",
    answer:
      "After six weekends shelving groceries, I bought a red portable radio. I remember carrying the unopened box home more clearly than my first paycheck.",
    medium: "text_photo",
    date: { type: "exact_date", value: "1983-07-16" },
    people: [],
    photoPlaceholder: "A small red 1980s portable radio in its cardboard box",
  },
  {
    question: "What was your first job?",
    title: "Aisle Four on Friday Nights",
    answer:
      "My first job was stocking shelves at Bell's Market. The manager taught me to face every label forward and never block the aisle with a carton.",
    medium: "voice",
    date: { type: "year", value: 1983 },
    people: ["person-manager-lee"],
    transcript:
      "Bell's Market smelled like cardboard and oranges, and Mr. Lee could spot one crooked label from the other end of the aisle.",
  },
  {
    question: "What happened the first time you drove alone?",
    title: "Three Trips Around the Block",
    answer:
      "I meant to drive straight to Mara's house, but I circled the block three times before feeling brave enough to turn onto the main road.",
    medium: "text",
    date: { type: "age", value: 17 },
    people: ["person-mara"],
  },
  {
    question: "What was considered expensive when you were growing up?",
    title: "Restaurant Dessert",
    answer:
      "Ordering dessert at a restaurant felt extravagant. We usually shared one slice of pie, and my brother and I watched carefully to keep the portions equal.",
    medium: "text",
    date: { type: "life_period", value: "school years" },
    people: ["person-brother"],
  },
  {
    question: "What was the first computer you remember using?",
    title: "The Library Computer",
    answer:
      "The first computer I used sat beside the library reference desk. Its green letters appeared slowly, and the librarian kept the instructions in a plastic sleeve.",
    medium: "photo",
    date: { type: "approximate_year", value: 1985 },
    people: [],
    photoPlaceholder:
      "A fictional library desk with an early green-screen computer",
  },
  {
    question: "What did your parents repeatedly tell you as a child?",
    title: "Leave Things Better",
    answer:
      "My mother always said to leave a place better than I found it. She meant borrowed kitchens, campsites, friendships, and sometimes whole afternoons.",
    medium: "voice",
    date: { type: "unknown" },
    people: ["person-mother"],
    transcript:
      "Mom said, leave it better than you found it. She used the same sentence for a picnic table and for an argument.",
  },
  {
    question: "Who was a teacher you still remember clearly?",
    title: "Mrs. Calder's Quiet Minute",
    answer:
      "Mrs. Calder began class with one minute of silence so everyone could arrive mentally. She noticed careful work and never confused speed with intelligence.",
    medium: "text",
    date: { type: "year", value: 1981 },
    people: ["person-mrs-calder"],
  },
  {
    question: "What was a school day you could not stop talking about?",
    title: "The Planetarium Ceiling",
    answer:
      "Our class visited a planetarium, and the dark ceiling seemed to open above us. I came home explaining constellations with a flashlight and a colander.",
    medium: "text_photo",
    date: { type: "approximate_year", value: 1979 },
    people: ["person-mrs-calder"],
    photoPlaceholder:
      "A fictional school group looking up inside a planetarium",
  },
  {
    question: "What song reminds you of learning who you were?",
    title: "The Song on Both Sides",
    answer:
      "One cassette lived in my bag for an entire summer. I played both sides until the labels faded and learned every pause between the songs.",
    medium: "voice",
    date: { type: "life_period", value: "late teens" },
    people: [],
    transcript:
      "I won't name the songs because the important part was the ritual of turning that same cassette over and starting again.",
  },
  {
    question: "What was your first home away from your family home like?",
    title: "The Apartment Above the Bakery",
    answer:
      "My first apartment was above a bakery, with uneven floors and one stubborn window. Bread smells reached the stairwell before sunrise.",
    medium: "photo",
    date: { type: "year", value: 1988 },
    people: [],
    photoPlaceholder: "A narrow brick apartment above a small fictional bakery",
  },
  {
    question: "Who helped you feel at home in a new place?",
    title: "Nora's Extra Chair",
    answer:
      "Nora invited me to a crowded dinner during my first week in the city. She found one more chair and made introductions without making me perform being new.",
    medium: "text",
    date: { type: "approximate_year", value: 1988 },
    people: ["person-nora"],
  },
  {
    question:
      "What ordinary object marks the beginning of an important relationship?",
    title: "The Borrowed Umbrella",
    answer:
      "Sam lent me a striped umbrella after a meeting and walked the long way to the station. Returning it became our excuse to meet again.",
    medium: "text_photo",
    date: { type: "exact_date", value: "1991-10-03" },
    people: ["person-sam"],
    photoPlaceholder: "A striped umbrella leaning against a cafe chair",
  },
  {
    question: "What meal became part of your own household?",
    title: "Sunday Tomato Soup",
    answer:
      "Sam and I started making tomato soup on Sundays when money was tight. Years later we kept the ritual even when dinner no longer needed to be inexpensive.",
    medium: "voice",
    date: { type: "life_period", value: "early partnership" },
    people: ["person-sam"],
    transcript:
      "The soup began as a budget meal, but the sound of it simmering became the sound of Sunday in our home.",
  },
  {
    question: "What small moment made a major life change feel real?",
    title: "Shoes by the Door",
    answer:
      "Becoming a parent felt real when I saw one tiny pair of shoes beside ours. The ordinary hallway suddenly looked like evidence of a different life.",
    medium: "photo",
    date: { type: "year", value: 1997 },
    people: ["person-sam", "person-child-lena"],
    photoPlaceholder:
      "Three pairs of fictional family shoes beside a front door",
  },
  {
    question: "What game did a child in your life ask you to play repeatedly?",
    title: "The Cardboard Train",
    answer:
      "Lena turned three boxes into a train and issued handwritten tickets. We traveled to the moon, the grocery store, and her grandmother's kitchen.",
    medium: "voice_photo",
    date: { type: "age", value: 34 },
    people: ["person-child-lena", "person-mother"],
    transcript:
      "The cardboard train had strict ticket rules, even though every destination was only a few feet across the living room.",
    photoPlaceholder: "A cardboard-box train with hand-drawn tickets",
  },
  {
    question: "What work accomplishment mattered for reasons beyond the title?",
    title: "The Community Room Opened",
    answer:
      "I helped open a community reading room in a vacant storefront. The important moment was seeing someone settle into a chair before the opening speeches ended.",
    medium: "text_photo",
    date: { type: "exact_date", value: "2004-05-22" },
    people: ["person-nora"],
    photoPlaceholder:
      "A bright fictional neighborhood reading room on opening day",
  },
  {
    question: "When did someone younger teach you something unexpected?",
    title: "Lena Fixed the Printer",
    answer:
      "At twelve, Lena fixed the printer while I was still reading the manual. She stayed patient and asked why adults pretend not to need instructions.",
    medium: "text",
    date: { type: "year", value: 2009 },
    people: ["person-child-lena"],
  },
  {
    question: "What trip is preserved for you in one quiet scene?",
    title: "Rain at the Harbor",
    answer:
      "On a coastal trip, rain emptied the harbor walkway. Sam and I stood under an awning sharing hot coffee while boats clicked against their lines.",
    medium: "voice_photo",
    date: { type: "approximate_year", value: 2012 },
    people: ["person-sam"],
    transcript:
      "The harbor was nearly empty, and the sound was mostly rain, rigging, and the paper coffee cups in our hands.",
    photoPlaceholder: "A rainy fictional harbor seen from beneath an awning",
  },
  {
    question: "What family habit did you understand differently as an adult?",
    title: "My Father's Careful Lists",
    answer:
      "I used to tease my father for making lists for everything. Later I understood that lists were how he made uncertainty feel manageable.",
    medium: "text",
    date: { type: "life_period", value: "middle adulthood" },
    people: ["person-father"],
  },
  {
    question: "What changed when you returned to a childhood place?",
    title: "The Maple Tree Was Smaller",
    answer:
      "I returned to my childhood street and was startled that the maple tree looked ordinary. In memory it had filled the entire bedroom window.",
    medium: "photo",
    date: { type: "exact_date", value: "2018-09-09" },
    people: [],
    photoPlaceholder: "A mature maple tree outside a fictional childhood home",
  },
  {
    question: "What recent routine would you want someone to remember?",
    title: "Wednesday Walks",
    answer:
      "Every Wednesday Mara and I walk the riverside path and trade one piece of news before discussing anything practical. The rule keeps the walks personal.",
    medium: "voice",
    date: { type: "year", value: 2025 },
    people: ["person-mara"],
    transcript:
      "We start every Wednesday walk with one real piece of news, not schedules or errands, and the rest follows from there.",
  },
  {
    question: "What ordinary sound tells you that you are home?",
    title: "The Hallway Floorboard",
    answer:
      "A floorboard near the hallway gives one soft click at night. I know where to step around it, but I rarely do because the sound means home.",
    medium: "text",
    date: { type: "unknown" },
    people: ["person-sam"],
  },
] satisfies DemoMemorySeed[];

const questions = memories.map((memory, index) => ({
  id: `demo-question-${String(index + 1).padStart(2, "0")}`,
  questionText: memory.question,
}));

const assignments = questions.map((question, index) => ({
  id: `demo-assignment-${String(index + 1).padStart(2, "0")}`,
  questionId: question.id,
  status: "answered" as const,
}));

export const demoArchive = demoArchiveSchema.parse({
  activeQuestion: {
    id: "demo-question-active",
    questionText: "What was a small kindness you noticed this week?",
  },
  assignments,
  fixtureVersion: 1,
  id: "fictional-year-in-memories",
  memories: memories.map((memory, index) => ({
    ...memory,
    assignmentId: assignments[index].id,
    id: `demo-memory-${String(index + 1).padStart(2, "0")}`,
  })),
  people: [
    { id: "person-mother", name: "Ruth Vale", relationship: "mother" },
    { id: "person-father", name: "Daniel Vale", relationship: "father" },
    { id: "person-brother", name: "Peter Vale", relationship: "brother" },
    { id: "person-aunt-june", name: "June Vale", relationship: "aunt" },
    {
      id: "person-grandfather",
      name: "Arthur Vale",
      relationship: "grandfather",
    },
    { id: "person-mara", name: "Mara Bell", relationship: "lifelong friend" },
    {
      id: "person-manager-lee",
      name: "Harold Lee",
      relationship: "first manager",
    },
    { id: "person-mrs-calder", name: "Irene Calder", relationship: "teacher" },
    {
      id: "person-nora",
      name: "Nora Finch",
      relationship: "friend and colleague",
    },
    { id: "person-sam", name: "Sam Rowan", relationship: "spouse" },
    { id: "person-child-lena", name: "Lena Rowan", relationship: "daughter" },
  ],
  preferences: {
    deliveryDay: "sunday",
    deliveryWindow: "morning",
    preservationInterests: [
      "everyday life",
      "family",
      "firsts",
      "places",
      "work",
    ],
    sensitiveTopics: ["health", "trauma"],
    timezone: "America/New_York",
  },
  profile: {
    birthYear: 1966,
    childhoodLocation: "Northfield, Pennsylvania (fictional)",
    firstName: "Elena",
    notice: "Entirely fictional demonstration data",
  },
  questions,
});

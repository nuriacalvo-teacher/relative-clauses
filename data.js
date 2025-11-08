const theoryContent = `
    <div class="theory-section">
        <h2>Introduction to Relative Clauses</h2>
        <p>Relative clauses give additional information about a noun. They start with a relative pronoun (who, which, that, whose, etc.) and can be defining (essential) or non-defining (extra information).</p>
    </div>

    <div class="theory-section">
        <h2>Defining Relative Clauses</h2>
        <p>Defining relative clauses provide ESSENTIAL information. We need this information to understand which person or thing we are talking about. These clauses are NOT separated by commas.</p>
        <div class="example">
            <div class="example-en">The woman who lives next door works in a bank.</div>
            <div class="example-es">La mujer que vive al lado trabaja en un banco.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Non-Defining Relative Clauses</h2>
        <p>Non-defining relative clauses provide EXTRA information. This information is not necessary to understand the sentence. These clauses ARE separated by commas. We cannot use 'that' in non-defining clauses.</p>
        <div class="example">
            <div class="example-en">Marie Curie, who discovered radium, was a scientist.</div>
            <div class="example-es">Marie Curie, quien descubrió el radio, fue una científica.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Pronouns: WHO</h2>
        <p>WHO is used for PEOPLE. It can be the subject or object of the relative clause. It can be used in both defining and non-defining clauses.</p>
        <div class="example">
            <div class="example-en">The man who called yesterday wants to speak to you.</div>
            <div class="example-es">El hombre que llamó ayer quiere hablar contigo.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Pronouns: WHICH</h2>
        <p>WHICH is used for THINGS and ANIMALS. It can be the subject or object. It can be used in both defining and non-defining clauses.</p>
        <div class="example">
            <div class="example-en">The book which I lent you is based on a true story.</div>
            <div class="example-es">El libro que te presté está basado en una historia real.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Pronouns: THAT</h2>
        <p>THAT can refer to PEOPLE, ANIMALS, or THINGS. However, it is ONLY used in DEFINING relative clauses. THAT is more informal and common in spoken English.</p>
        <div class="example">
            <div class="example-en">The laptop that I bought last week is working perfectly.</div>
            <div class="example-es">El portátil que compré la semana pasada funciona perfectamente.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Pronouns: WHOSE</h2>
        <p>WHOSE indicates POSSESSION. It can refer to people, animals, or things. It can be used in both defining and non-defining clauses.</p>
        <div class="example">
            <div class="example-en">The man whose car I saw was wearing a hat.</div>
            <div class="example-es">El hombre cuyo coche vi llevaba un sombrero.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Adverbs: WHEN</h2>
        <p>WHEN refers to TIME. It replaces 'in/on/at which'. WHEN is used in both defining and non-defining relative clauses.</p>
        <div class="example">
            <div class="example-en">Summer is the season when I'm happiest.</div>
            <div class="example-es">El verano es la estación cuando soy más feliz.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Adverbs: WHERE</h2>
        <p>WHERE refers to PLACE. It replaces 'in/at/on which'. WHERE is used in both defining and non-defining relative clauses.</p>
        <div class="example">
            <div class="example-en">That's the stadium where Real Madrid play.</div>
            <div class="example-es">Ese es el estadio donde juega el Real Madrid.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>Relative Adverbs: WHY</h2>
        <p>WHY refers to REASON. It replaces 'for which'. WHY is typically used in defining clauses and usually appears after the word 'reason'.</p>
        <div class="example">
            <div class="example-en">I don't know the reason why she left.</div>
            <div class="example-es">No sé la razón por la que se fue.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>When to Omit the Relative Pronoun</h2>
        <p>The relative pronoun can ONLY be omitted when it is the OBJECT of the relative clause (not the subject). If the pronoun is the subject, it MUST be included.</p>
        <div class="example">
            <div class="example-en">This is the house (that) Jack built.</div>
            <div class="example-es">Esta es la casa que Jack construyó.</div>
        </div>
    </div>

    <div class="theory-section">
        <h2>When to Use Commas</h2>
        <p>DEFINING clauses (essential information) are NOT separated by commas. NON-DEFINING clauses (extra information) ARE always separated by commas.</p>
        <div class="example">
            <div class="example-en">The students who study regularly pass the exam.</div>
            <div class="example-es">Los estudiantes que estudian regularmente aprueban el examen.</div>
        </div>
    </div>
`;

const exercisesData = [
    // Multiple Choice (0-9)
    { type: 'multipleChoice', question: 'The man ___ called yesterday wants to speak to you.', options: ['who', 'which', 'where', 'whose'], correct: ['who'] },
    { type: 'multipleChoice', question: 'This is the book ___ I recommended to you.', options: ['who', 'that', 'when', 'where'], correct: ['that'] },
    { type: 'multipleChoice', question: 'Sarah, ___ is my best friend, is coming to visit.', options: ['who', 'which', 'whose', 'that'], correct: ['who'] },
    { type: 'multipleChoice', question: 'The city ___ we visited last summer was beautiful.', options: ['that', 'where', 'whose', 'what'], correct: ['that', ''] },
    { type: 'multipleChoice', question: 'The students ___ study every day always get good grades.', options: ['who', 'which', 'why', 'when'], correct: ['who'] },
    { type: 'multipleChoice', question: '___ is the best season for traveling?', options: ['When', 'Where', 'Why', 'Which'], correct: ['When'] },
    { type: 'multipleChoice', question: 'The restaurant, ___ serves Italian food, is near my house.', options: ['who', 'which', 'that', 'why'], correct: ['which'] },
    { type: 'multipleChoice', question: 'I don\'t know the reason ___ he decided to leave.', options: ['who', 'where', 'why', 'when'], correct: ['why'] },
    { type: 'multipleChoice', question: 'The girl ___ backpack is this must be very organized.', options: ['whose', 'who', 'which', 'what'], correct: ['whose'] },
    { type: 'multipleChoice', question: 'The day ___ I met you was special.', options: ['what', 'where', 'when', '-'], correct: ['-'] },

    // Fill in the Gaps (10-29)
    { type: 'fillInGaps', sentence: 'The woman ___ is waiting outside is my sister.', correct: ['who'] },
    { type: 'fillInGaps', sentence: 'The house ___ I grew up in is still standing.', correct: ['where'] },
    { type: 'fillInGaps', sentence: 'That\'s the place ___ we first met.', correct: ['where'] },
    { type: 'fillInGaps', sentence: 'My father, ___ is a doctor, works at the hospital.', correct: ['who'] },
    { type: 'fillInGaps', sentence: 'The girl ___ parents are teachers wants to be a scientist.', correct: ['whose'] },
    { type: 'fillInGaps', sentence: 'The film ___ we watched last night was fantastic.', correct: ['that', ''] },
    { type: 'fillInGaps', sentence: 'The reason ___ I\'m late is the traffic.', correct: ['why'] },
    { type: 'fillInGaps', sentence: 'She has a brother, ___ works as a pilot.', correct: ['who'] },
    { type: 'fillInGaps', sentence: 'The school ___ you study is very modern.', correct: ['where'] },
    { type: 'fillInGaps', sentence: 'Do you remember the time ___ we went to the beach?', correct: ['when', ''] },
    { type: 'fillInGaps', sentence: 'The boy ___ won the competition was only 12 years old.', correct: ['who'] },
    { type: 'fillInGaps', sentence: 'That\'s the person ___ I told you about.', correct: ['that', ''] },
    { type: 'fillInGaps', sentence: 'The car ___ is parked outside belongs to my uncle.', correct: ['that'] },
    { type: 'fillInGaps', sentence: 'The city ___ we visited is in Spain.', correct: ['that', 'which', ''] },
    { type: 'fillInGaps', sentence: 'I can\'t find the keys ___ I lost yesterday.', correct: ['that', ''] },
    { type: 'fillInGaps', sentence: 'The teacher ___ teaches biology is very strict.', correct: ['who'] },
    { type: 'fillInGaps', sentence: 'The book ___ is on the table is mine.', correct: ['that'] },
    { type: 'fillInGaps', sentence: 'That\'s the reason ___ I didn\'t come.', correct: ['why'] },
    { type: 'fillInGaps', sentence: 'The restaurant ___ serves sushi is very popular.', correct: ['that'] },
    { type: 'fillInGaps', sentence: 'The song ___ she is singing is beautiful.', correct: ['that', ''] },

    // Rephrasing (30-49)
    { type: 'rephrasing', instruction: 'Combine: I met a girl. She is from France.', correct: ['I met a girl who is from France', 'I met a girl that is from France'] },
    { type: 'rephrasing', instruction: 'Combine: This is my phone. I bought it last week.', correct: ['This is my phone, which I bought last week', 'This is the phone I bought last week', 'This is the phone which I bought last week', 'This is the phone that I bought last week'] },
    { type: 'rephrasing', instruction: 'Rewrite: The teacher came late. He is always punctual. (Hint: there are other teachers)', correct: ['The teacher who is always punctual came late', 'the teacher who came late is always punctual', 'the teacher that came late is always punctual'] },
    { type: 'rephrasing', instruction: 'Combine: I have a dog. Its name is Max.', correct: ['I have a dog whose name is Max'] },
    { type: 'rephrasing', instruction: 'Rewrite: We visited Paris. It is a beautiful city.', correct: ['We visited Paris, which is a beautiful city'] },
    { type: 'rephrasing', instruction: 'Combine: The man left. He was angry.', correct: ['The man who was angry left', 'The man who left was angry', 'The man that was angry left', 'The man that left was angry'] },
    { type: 'rephrasing', instruction: 'Rewrite: I saw a movie. The movie was boring.', correct: ['I saw a movie which was boring', 'I saw a movie that was boring'] },
    { type: 'rephrasing', instruction: 'Combine: She lives in London. London is the capital of England.', correct: ['She lives in London, which is the capital of England'] },
    { type: 'rephrasing', instruction: 'Rewrite: Tom has a brother. His brother plays football.', correct: ['Tom has a brother who plays football', 'Tom has a brother that plays football'] },
    { type: 'rephrasing', instruction: 'Combine: The reason was important. I didn\'t understand it. (Hint: there are more reasons)', correct: ['The reason which I didn\'t understand was important', 'The reason that I didn\'t understand was important', 'The reason I didn\'t understand was important'] },
    { type: 'rephrasing', instruction: 'Rewrite: I bought a car. The car is very fast.', correct: ['I bought a car which is very fast', 'I bought a car that is very fast'] },
    { type: 'rephrasing', instruction: 'Combine: That\'s the girl. I invited her to the party.', correct: ['That\'s the girl who I invited to the party', 'That\'s the girl that I invited to the party', 'That\'s the girl I invited to the party', 'That\'s the girl whom I invited to the party'] },
    { type: 'rephrasing', instruction: 'Rewrite: The place was fantastic. We spent our holidays there.', correct: ['The place where we spent our holidays was fantastic'] },
    { type: 'rephrasing', instruction: 'Combine: The problem is complicated. It needs to be solved. (Hint: there are more problems)', correct: ['The problem which needs to be solved is complicated', 'The problem that needs to be solved is complicated', 'The problem that needs to be solved is complicated', 'The problem which needs to be solved is complicated'] },
    { type: 'rephrasing', instruction: 'Rewrite: My friend works in an office. The office is downtown.', correct: ['My friend works in an office which is downtown', 'My friend works in an office that is downtown'] },
    { type: 'rephrasing', instruction: 'Combine: I have a bike. I use it every day.', correct: ['I have a bike which I use every day', 'I have a bike that I use every day', 'I have a bike I use every day'] },
    { type: 'rephrasing', instruction: 'Rewrite: The music is nice. I\'m listening to it.', correct: ['The music which I\'m listening to is nice', 'The music that I\'m listening to is nice', 'The music I\'m listening to is nice'] },
    { type: 'rephrasing', instruction: 'Combine: That\'s the moment. I realized the truth.', correct: ['That\'s the moment when I realized the truth', 'That\'s the moment I realized the truth'] },
    { type: 'rephrasing', instruction: 'Rewrite: She has a family. Her family is very supportive.', correct: ['She has a family that is very supportive', 'She has a family which is very supportive', 'She has a family which is very supportive', 'She has a family who is very supportive', 'She has a family who are very supportive'] },
    { type: 'rephrasing', instruction: 'Combine: I work with people. They are very friendly.', correct: ['I work with people who are very friendly', 'I work with people that are very friendly'] }
];

class Character {
    #documentId;
    #firstName;
    #lastName;
    #specie;
    #category;
    #allegiances = [];
    #birthPlanet;
    #birthDate;
    #deathPlanet;
    #deathDate;
    #imageUrl;

    constructor(documentId, firstName, lastName, specie, category, allegiances,
        birthPlanet, birthDate, deathPlanet, deathDate, imageUrl) {
        this.#documentId = documentId;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#specie = specie;
        this.#category = category;
        this.#allegiances = allegiances;
        this.#birthPlanet = birthPlanet;
        this.#birthDate = birthDate;
        this.#deathPlanet = deathPlanet;
        this.#deathDate = deathDate;
        this.#imageUrl = imageUrl;
    }

    get documentId() {
        return this.#documentId;
    }

    get name() {
        return this.#firstName+' '+this.#lastName;
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get specie() {
        return this.#specie;
    }

    get category() {
        return this.#category;
    }

    get allegiances() {
        return this.#allegiances;
    }

    get birthPlanet() {
        return this.#birthPlanet;
    }

    get birthDate() {
        return this.#birthDate;
    }

    get deathPlanet() {
        return this.#deathPlanet;
    }

    get deathDate() {
        return this.#deathDate;
    }

    get imageUrl() {
        return this.#imageUrl;
    }
}

export default Character;
export default class GameController {

    static async createGame() {
        try {
            const gameCreated = await fetch(`http://localhost:8008/game`, {
                method: 'POST'
            });
            return gameCreated.json();
        } catch (e) {
            console.log('Error while fetching request',e);
        }
    }

    static async addMap(gameId, queryParams) {
        try {
            const game = await fetch(`http://localhost:8008/game/${gameId}?${queryParams}`, {
                method: 'PATCH'
            });
            return game.json();
        } catch (e) {
            console.log('Error while fetching request',e);
        }
    }

    static async generateCode(gameId) {
        try {
            const game = await fetch(`http://localhost:8008/game/${gameId}/generate`, {
                method: 'PATCH'
            });
            return game.json();
        } catch (e) {
            console.log('Error while fetching request',e);
        }
    }

}

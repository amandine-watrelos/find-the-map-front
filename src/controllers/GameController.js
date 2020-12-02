export default class GameController {

    static async createGame() {
        try {
            const gameCreated = await fetch(`${process.env.apiUrl}/game`, {
                method: 'POST'
            });
            return gameCreated.json();
        } catch (e) {
            console.log('Error while fetching request',e);
        }
    }

    static async addMap(gameId, queryParams) {
        try {
            const game = await fetch(`${process.env.apiUrl}/game/${gameId}?${queryParams}`, {
                method: 'PATCH'
            });
            return game.json();
        } catch (e) {
            console.log('Error while fetching request',e);
        }
    }

}

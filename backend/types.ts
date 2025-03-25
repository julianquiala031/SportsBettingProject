import { LargeNumberLike } from "crypto";
import { StringValidation } from "zod";

export type GameData = {
    id: number;
    league: {
      id: number;
      name: string;
      country: string;
    };
    teams: {
      home_team: string;
      away_team: string;
      startTime: string;
    };
    date: string;
    status: {
      long: string;
      short: string;
    };
    odds?: {
      bookmakers: {
        name: string;
        bets: {
          name: string;
          values: { team: string; odd: number }[];
        }[];
      }[];
    };
}

export type NBAGameData = {
    id: number;
    sport: "Basketball"; 
    league: string;
    date: {
      start: string;
    };
    teams:{
        visitors:{
            name: string;
        };
        home:{
            name: string;
        };
    };
    status: {
      long: string;
      short: string;
    };
    scores:{
        visitors:{
            win: number;
            loss: number; 
            series: {
                win: number;
                loss: number;
            };
            linescore: {
                0: number;
                1: number; 
                2: number;
                3: number;
            };
            points: number;
        };
        home:{
          win: number;
            loss: number; 
            series: {
                win: number;
                loss: number;
            };
            linescore: {
                0: number;
                1: number; 
                2: number;
                3: number;
            };
            points: number;
        }
    };
    odds?: {
      bookmakers: {
        name: string;
        bets: {
          name: string;
          values: { team: string; odd: number }[];
        }[];
      }[];
    };
}

export type NBAGame = {
    id: number;
    sport: "Basketball";
    league: string;
    home_team: string;
    away_team: string;
    startTime: string;
    odds?: {
      moneyline?: {
        home?: number;
        away?: number;
      };
    };
    status: string;
    home_points: number;
    away_points: number;
    home_wins: number;
    home_losses: number;
    away_wins: number;
    away_losses: number;
    homeline: {
      q1: number;
      q2: number;
      q3: number;
      q4: number;
    };
    awayline: {
      q1: number;
      q2: number;
      q3: number;
      q4: number;
    }
  };


export type NFLGameData = {
    id: number;
    sport: string;
    teams:{
      home: {
        name: string;
      }; 
      away: {
      name: string;
    }; 
  };   

    scores: {
        home: {
          quarter_1: number;
          quarter_2: number;
          quarter_3: number;
          quarter_4: number;
          overtime: number | null;
          total: number | null; 
        };
        away: {
          quarter_1: number;
          quarter_2: number;
          quarter_3: number;
          quarter_4: number;
          overtime: number | null;
          total: number | null; 
        };
    }; 
    odds?: {
      bookmakers: {
        name: string;
        bets: {
          name: string;
          values: { team: string; odd: number }[];
        }[];
      }[];
    };
}

export type NFLGame = {
    id: number;
    sport: "Football";
    home_team: string;
    away_team: string;
    scores: {
        home: {
          quarter_1: number;
          quarter_2: number;
          quarter_3: number;
          quarter_4: number;
          overtime: number | null;
          total: number | null; 
        };
        away: {
          quarter_1: number;
          quarter_2: number;
          quarter_3: number;
          quarter_4: number;
          overtime: number | null;
          total: number | null; 
        };
    }; 
    odds?: {
      bookmakers: {
        name: string;
        bets: {
          name: string;
          values: { team: string; odd: number }[];
        }[];
      }[];
    };
  };


export type MLBGameData = {
    id: number;
    league: {
      id: number;
      name: string;
      country: string;
    };
    teams:{
      home: {
        name: string;
      };
      away: {
        name: string;
    };
  };
    date: string;
    status: {
      long: string;
      short: string;
    };
    scores: {
        home: {
          hits: number;
          errors: number;
          innings: {
              1: number;
              2: number;
              3: number;
              4: number;
              5: number;
              6: number;
              7: number;
              8: number;
              9: number;
              extra: number;
          };
          total: number;
        };
        away: {
          hits: number;
          errors: number;
          innings: {
              1: number;
              2: number;
              3: number;
              4: number;
              5: number;
              6: number;
              7: number;
              8: number;
              9: number;
              extra: number;
          };
          total: number;
        };
    };
    errors?: {
        home: number;
        away: number;
    };
    innings?: {
        home: { [key: string]: number | null };  
        away: { [key: string]: number | null };
    };
    odds?: {
      bookmakers: {
        name: string;
        bets: {
          name: string;
          values: { team: string; odd: number }[];
        }[];
      }[];
    };
}

export type MLBGame = {
  id: number;
    league: {
      id: number;
      name: string;
      country: string;
    };
    home_team: string;
    away_team: string;
    date: string;
    status: {
      long: string;
      short: string;
    };
    scores: {
        home: {
          hits: number;
          errors: number;
          innings: {
              inning_1: number;
              inning_2: number;
              inning_3: number;
              inning_4: number;
              inning_5: number;
              inning_6: number;
              inning_7: number;
              inning_8: number;
              inning_9: number;
              extra: number;
          };
          total: number;
        };
        away: {
          hits: number;
          errors: number;
          innings: {
              inning_1: number;
              inning_2: number;
              inning_3: number;
              inning_4: number;
              inning_5: number;
              inning_6: number;
              inning_7: number;
              inning_8: number;
              inning_9: number;
              extra: number;
          }
          total: number;
        }
    };
    errors?: {
        home: number;
        away: number;
    };
    innings?: {
        home: { [key: string]: number | null };  
        away: { [key: string]: number | null };
    };
    odds?: {
      bookmakers: {
        name: string;
        bets: {
          name: string;
          values: { team: string; odd: number }[];
        }[];
      }[];
    };
}

export type ApiResponse = {
    get: string;
    parameters: {
      date: string;
    };
    errors: any[];
    results: number;
  };

  export type NBAApiresponse = ApiResponse &  { 
    response: NBAGameData[]; //game array
  }

  export type NFLApiResponse = ApiResponse & {
    response: NFLGameData[]; //game array
  }

  export type MLBApiResponse = ApiResponse & {
    response: MLBGameData[]; //game arrary
  }

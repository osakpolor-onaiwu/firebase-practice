const initialState = {
    projects: [
        { id: 1, content: "play pes", title: "gaming" },
        { id: 2, content: "read bible", title: "reading" },
    ],
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_PROJECT":
            console.log("Created Poject", action.project);
            return state;
        case "CREATE_PROJECT_ERROR":
            console.log("create project error",action.err);
            return state;
        default:
            return state
    }
    // here we handle all project action types, so we could have used if statement,
    // but since there can be many type of  actions, we use switch statement and  return something for
    // eact case. so we are saying if the action type is CREATE_PROJECT, do this
};
export default projectReducer;

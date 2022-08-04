import action from "../../store/action";
import {
    ARTICLE,
    ARTICLE_LIKE,
    ARTICLES_UPDATED,
    ARTICLES,
} from "./actions";
const actionsProcessed = action.processMultiple([
    {
        stateName: 'getArticlesRequest',
        action: ARTICLES,
        endPoint: 'articles',
        paginate:true,
    },
    {
        stateName: 'getArticleRequest',
        action: ARTICLE,
        single:true,
        endPoint: 'articles/{slug}',
    },
    {
        stateName: 'getArticleLikeRequest',
        action: ARTICLE_LIKE,
        endPoint: 'articles/{slug}/like',
        method:'put'
    },
]);

actionsProcessed.mutations = {
    ...actionsProcessed.mutations,
    [ARTICLES_UPDATED](state, data) {
        let list = state.getArticlesRequest.data.data;
        let item;
        for( let i = 0; i < list.length; i++){
            item = list[i];
            if (data[item.slug]) {
                list[i] = {...item, ...data[item.slug]};
            }
        }
        state.getArticlesRequest.data.data = [...list];
        state.getArticlesRequest = {...state.getArticlesRequest};
    },
}

export default actionsProcessed

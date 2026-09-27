import axios from "axios";
import { create } from "zustand";
import * as postApi from "../api/posts";

const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: null,

    fetchPosts: async () => {
        //데이터를 요청시 로딩처리
        set({loading: true, error: null})
        try{
            const response = await postApi.getPosts();
            set({posts: response.data, loading: false})
        } catch(error) {
            set({error: error.message, loading: false})
        }
    },

    deletePost: async (id) => {
        set({loading: true, error: null});
        try{
            await postApi.deletePost(id);
            set((state) => ({
                posts: state.posts.filter(post => post.id !== id),
                loading: false,
            }))
        } catch(error) {
            set({error: error.message, loading: false})
        }
    },

    addPost: async (post) => {
        set({loading: true, error: null});
        try{
            const response = await postApi.createPost(post);
            set((state) => ({
                posts: [...state.posts, response.data],
                loading: false,
            }))
        } catch(error) {
            set({error: error.message, loading: false})
        }
    },

    updatePost: async (id, updatePost) => {
        set({loading: true, error: null});
        try{
            const response = await postApi.updatePost(id, updatePost);

            if (response.status === 200) {
                set((state) => ({
                    posts: state.posts.map(post => 
                        post.id === id ? {...post, ...updatePost} : post
                    ),
                    loading: false,
                }));
            } else {
                throw new Error('게시글 수정 실패.')
            }
        } catch(error) {
            set({error: error.message, loading: false})
            throw error;
        }
    },
}))

export default usePostStore;
import { useDispatch } from 'react-redux';
import { addComment } from '../../reducers/blogReducer';

const Comments = ({ comments, id }) => {
	const dispatch = useDispatch();

	const submitComment = (event) => {
		event.preventDefault();
		const comment = event.target.comment.value;
		dispatch(addComment(id, comment));
		event.target.comment.value = '';
	};

	return (
		<div>
			<h2>comments</h2>
			<form action='' onSubmit={submitComment}>
				<input type='text' name='comment' />
				<button type='submit'>submit</button>
			</form>
			<ul>
				{comments.map((comment) => {
					return <li key={comment.id}>{comment.content}</li>;
				})}
			</ul>
		</div>
	);
};

export default Comments;

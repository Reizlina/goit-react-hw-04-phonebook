import PropTypes from 'prop-types';
import s from './SearchContact.module.css';

function SearchContact({ findContact }) {
  return (
    <div className={s.wrap}>
      <input
        className={s.input}
        placeholder="Find contacts by name"
        type="text"
        name="search"
        onChange={findContact}
      ></input>
    </div>
  );
}

export default SearchContact;

SearchContact.propTypes = {
  findContact: PropTypes.func.isRequired,
};

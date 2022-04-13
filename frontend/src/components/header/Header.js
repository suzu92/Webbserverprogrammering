import css from './HeaderStyle.module.css'

const Header = () => {
    return (
        <header>
            <div className={css.header}>
                <div className={css.headersection}>
                    <h1>Todo App</h1>
                </div>
            </div>
        </header>
    )
};

export default Header;
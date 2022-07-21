import classnames from "classnames"

interface IStatusItem {
    accentValue: boolean
    displayValue: string
    iconClass: string
    label: string
}

export const StatusItem: React.FunctionComponent<IStatusItem> = ({accentValue, displayValue, iconClass, label}) => {

    return (
        <div className="status-row my-4 p-3 d-flex justify-content-between rounded">
            <div>
                <i className={`bi ${iconClass}`}></i>{label}
            </div>
            <div className={classnames('status-value', {'highlight' : accentValue})}>
                {displayValue}
            </div>
        </div>
    )
}
from dateutil.parser import parser


class Appointment:
    def __init__(self, id: int, date: str, start_time: str, customer_id: int, department_id: int, project_id: int = 0) -> None:
        par = parser()
        self.id = id
        self.date = par.parse(date).date()
        self.start_time = par.parse(start_time).time()
        self.customer_id = customer_id
        self.department_id = department_id
        self.project_id = project_id

    def toDict(self):
        return {
            "id": self.id,
            "date": self.date,
            "start_time": self.start_time.strftime("%H:%M"),
            "customer_id": self.customer_id,
            "department_id": self.department_id,
            "project_id": self.project_id
        }

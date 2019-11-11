import React, { Component } from 'react'
import moment from 'moment'
import { Button } from './Buttons';
import Modal from './Modal';
import 'moment/locale/es';
// import 'antd/lib/style/index.less';     //Add this code for locally example
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT } from 'react-big-scheduler'
import withDragDropContext from './withDnDContext'

import 'react-big-scheduler/lib/css/style.css'

class Calendar extends Component {
    constructor(props) {
        super(props);
        let resources = [
            {
                id: 'r0',
                name: 'Colect Products',
                groupOnly: true
            },
            {
                id: 'r1',
                name: 'Ship Products'
            },
            {
                id: 'r2',
                name: 'Check Inventory',
                parentId: 'r0'
            },
            {
                id: 'r3',
                name: 'Count Missing Products',
                parentId: 'r4'
            },
            {
                id: 'r4',
                name: 'Sort Inventory',
                parentId: 'r2'
            },
        ];
        let schedulerData = new SchedulerData(new moment("2019-11-14").format(DATE_FORMAT), ViewTypes.Week);
        schedulerData.config.resourceName = 'Activities'
        //let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Week);
        schedulerData.localeMoment.locale('en');
        this.state = {
            viewModel: schedulerData,
            resources: resources,
            events: [],
            currEvent: {},
            currResource: {},
            showEventModal: false,
            showResourceModal: false,
            callback: () => false
        }
        Promise.resolve(fetch('http://localhost:3001/calendar')).then(async resp => {
            const {events, resources} = await resp.json()
            console.log(events, resources);
            //schedulerData.setResources(resources);
            console.log(events);
            schedulerData.setEvents(events);
            this.setState({
                events: events,
                resources: resources,
                viewModel: schedulerData
            })
        })
        schedulerData.setResources(resources);
    }

    handleChange(event, ModalType) {
        switch(ModalType){
            case 'currEvent':
                let { name, value } = event.target;
                this.setState({
                    currEvent:{
                        [name]: value
                    }
                });
                break;
            default:
                return;
        }
    }

    closeModal(){
        this.setState({
            showEventModal: false,
            showResourceModal: false
        })
    }

    render() {
        const { viewModel } = this.state;
        return (
            <div>
                <div>
                    <Modal show={this.state.showEventModal}>
                        <Modal.Header>
                            <Modal.Title>
                                Add new Event
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{"display": "block"}}>
                                <label>Title:</label>
                            </div>
                            <div style={{"display": "block"}}>
                                <input type="text" name="title" onChange={(e) => this.handleChange(e, "currEvent")} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                btnStyle="primary"
                                onClick={this.state.callback}
                            >
                                Save
                            </Button>
                            <Button
                                btnStyle="default"
                                onClick={()=>this.setState({showEventModal: false})}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Scheduler schedulerData={viewModel}
                    prevClick={this.prevClick}
                    nextClick={this.nextClick}
                    onSelectDate={this.onSelectDate}
                    onViewChange={this.onViewChange}
                    eventItemClick={this.eventClicked}
                    viewEventClick={this.ops1}
                    viewEventText="Ops 1"
                    viewEvent2Text="Ops 2"
                    viewEvent2Click={this.ops2}
                    updateEventStart={this.updateEventStart}
                    updateEventEnd={this.updateEventEnd}
                    moveEvent={this.moveEvent}
                    newEvent={this.newEvent}
                    onScrollLeft={this.onScrollLeft}
                    onScrollRight={this.onScrollRight}
                    onScrollTop={this.onScrollTop}
                    onScrollBottom={this.onScrollBottom}
                    toggleExpandFunc={this.toggleExpandFunc}
                />
            </div>
        )
    }

    prevClick = (schedulerData) => {
        schedulerData.prev();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData) => {
        schedulerData.next();
        schedulerData.setEvents(this.state.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.events)
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.events);
        
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        //if (window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {
            this.setState({
                showEventModal: true,
                callback: () => this.continueNewEvent(schedulerData, slotId, start, end)
            })
            
        //}
    }

    continueNewEvent = (schedulerData, slotId, start, end) => {
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: this.state.currEvent.title,
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        }
        
        Promise.resolve(fetch('http://localhost:3001/calendar', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({events: [newEvent], resources: []}) // body data type must match "Content-Type" header
          })).then( async resp =>{
            if(resp.status==202){
                schedulerData.setEvents([...this.state.events, newEvent]);
                this.setState({
                    viewModel: schedulerData,
                    currEvent: newEvent,
                    events: [...this.state.events, newEvent],
                    showEventModal: false
                })
            }
        });
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if (window.confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if (window.confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if (window.confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(this.state.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(this.state.events);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
}

export default withDragDropContext(Calendar)
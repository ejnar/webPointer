package webpoint3


class DumpInterceptor {


    public DumpInterceptor() {
        match controller: 'PageItem'
    }

    boolean before() {
        log.debug "before"
        log.debug request.reader.text
        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }
}
